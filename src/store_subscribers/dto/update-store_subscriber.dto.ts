import { PartialType } from '@nestjs/swagger';
import { CreateStoreSubscriberDto } from './create-store_subscriber.dto';

export class UpdateStoreSubscriberDto extends PartialType(CreateStoreSubscriberDto) {}
