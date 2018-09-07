import { Module } from '@nestjs/common';
import { AcceptShipmentsController } from './accept-shipments.controller';

@Module({
  controllers: [AcceptShipmentsController]
})
export class AcceptShipmentsModule {}
