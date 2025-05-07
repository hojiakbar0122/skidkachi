import { Module } from '@nestjs/common';
import { StoreSubscribersService } from './store_subscribers.service';
import { StoreSubscribersController } from './store_subscribers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreSubscriber } from './models/store_subscriber.model';

@Module({
  imports:[SequelizeModule.forFeature([StoreSubscriber])],
  controllers: [StoreSubscribersController],
  providers: [StoreSubscribersService],
})
export class StoreSubscribersModule {}
