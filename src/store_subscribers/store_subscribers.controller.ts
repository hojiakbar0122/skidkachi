import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreSubscribersService } from './store_subscribers.service';
import { CreateStoreSubscriberDto } from './dto/create-store_subscriber.dto';
import { UpdateStoreSubscriberDto } from './dto/update-store_subscriber.dto';

@Controller('store-subscribers')
export class StoreSubscribersController {
  constructor(private readonly storeSubscribersService: StoreSubscribersService) {}

  @Post()
  create(@Body() createStoreSubscriberDto: CreateStoreSubscriberDto) {
    return this.storeSubscribersService.create(createStoreSubscriberDto);
  }

  @Get()
  findAll() {
    return this.storeSubscribersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSubscribersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreSubscriberDto: UpdateStoreSubscriberDto) {
    return this.storeSubscribersService.update(+id, updateStoreSubscriberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSubscribersService.remove(+id);
  }
}
