import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(createUserDto.email);
    if (candidate) {
      throw new ConflictException({
        message: "Bunday Email foyalnuvchi mavjud",
      });
    }
    const newUser = await this.usersService.create(createUserDto);
    return { message: "Foydlanuvchi qoshildi", userId: newUser.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException({ message: "Email yoki Password Notgiri" });
    }
    if (!user.is_active) {
      throw new BadRequestException({ message: "Avval Emailni Tasdiqlang" });
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException({ message: "Email yoki Password Notgiri" });
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();
    return { message: "Tizimga hush kelibsiz", accessToken };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException("User not verified");
    }

    const hashed_refresh_token = null;
    await this.usersService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };

    return response;
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    console.log(userId);
    console.log(decodedToken["id"]);

    if (userId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan");
    }

    const user = await this.usersService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("User not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Fornidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, hashed_refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message:"User refreshed",
      userId:user.id,
      access_token:accessToken
    }

    return response
  }
}
