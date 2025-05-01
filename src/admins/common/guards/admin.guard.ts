import {
    BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({ message: "Token topilmadi" });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Bearer, Token aniqlanmadi" });
    }

    async function verify(token: string, jwtService: JwtService) {
      let payload: any;
      try {
        payload = await jwtService.verify(token, {
          secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error);
      }

      if (!payload) {
        throw new UnauthorizedException("Unauthorized user");
      }

      if (!payload.is_creater) {
        throw new ForbiddenException("Ruxsat etilmagan");
      }

      req.admin = payload;
      return true;
    }
    return verify(token, this.jwtService);
  }
}
