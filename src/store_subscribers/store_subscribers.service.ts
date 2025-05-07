import { Injectable } from '@nestjs/common';
import { CreateStoreSubscriberDto } from './dto/create-store_subscriber.dto';
import { UpdateStoreSubscriberDto } from './dto/update-store_subscriber.dto';

@Injectable()
export class StoreSubscribersService {
  create(createStoreSubscriberDto: CreateStoreSubscriberDto) {
    return 'This action adds a new storeSubscriber';
  }

  findAll() {
    return `This action returns all storeSubscribers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeSubscriber`;
  }

  update(id: number, updateStoreSubscriberDto: UpdateStoreSubscriberDto) {
    return `This action updates a #${id} storeSubscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeSubscriber`;
  }
}
