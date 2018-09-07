import { DatabaseService } from 'services/database.service';
import { ShipmentSchema } from './../schemas/shipment-schema/shipment-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { FindShipmentController } from './find-shipment.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Shipments', schema: ShipmentSchema },
  ])],
  controllers: [FindShipmentController],
  providers: [DatabaseService],
})
export class FindShipmentModule {}
