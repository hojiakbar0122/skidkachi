import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from "bcrypt"

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private readonly adminModel:typeof Admin){}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    return newAdmin;
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedAdmin = await this.adminModel.update(
      {
        hashed_refresh_token,
      },
      { where: { id } }
    );
    return updatedAdmin
  }
}
