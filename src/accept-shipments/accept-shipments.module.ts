import { Module, HttpModule } from '@nestjs/common';
import { AcceptShipmentsController } from './accept-shipments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from 'services/database.service';
import { ShipmentSchema } from 'schemas/shipment-schema/shipment-schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Shipments', schema: ShipmentSchema }]),
  ],
  controllers: [AcceptShipmentsController],
  providers: [DatabaseService],
})
export class AcceptShipmentsModule {}
