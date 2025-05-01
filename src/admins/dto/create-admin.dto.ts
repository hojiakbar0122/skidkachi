export class CreateAdminDto {
  full_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  is_creater: boolean;
  is_active: boolean;
}
