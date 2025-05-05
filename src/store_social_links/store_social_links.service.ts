import { Injectable } from '@nestjs/common';
import { CreateStoreSocialLinkDto } from './dto/create-store_social_link.dto';
import { UpdateStoreSocialLinkDto } from './dto/update-store_social_link.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StoreSocialLink } from './models/store_social_link.model';

@Injectable()
export class StoreSocialLinksService {
  constructor(@InjectModel(StoreSocialLink) private readonly storeSocialLinksModel:typeof StoreSocialLink){}

  create(createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    return this.storeSocialLinksModel.create(createStoreSocialLinkDto);
  }

  findAll() {
    return this.storeSocialLinksModel.findAll();
  }

  findOne(id: number) {
    return this.storeSocialLinksModel.findByPk(id);
  }

  update(id: number, updateStoreSocialLinkDto: UpdateStoreSocialLinkDto) {
    return this.storeSocialLinksModel.update(updateStoreSocialLinkDto, {where:{id}});
  }

  remove(id: number) {
    return this.storeSocialLinksModel.destroy({where:{id}});
  }
}
