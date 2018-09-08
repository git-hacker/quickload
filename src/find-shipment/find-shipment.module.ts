import { CalculateShipmentsService } from 'services/calculate-shipments.service';
import { DatabaseService } from 'services/database.service';
import { ShipmentSchema } from './../schemas/shipment-schema/shipment-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, HttpModule } from '@nestjs/common';
import { FindShipmentController } from './find-shipment.controller';
import { ShipmentLogSchema } from 'schemas/shipment-log/shipment-log-schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'Shipments', schema: ShipmentSchema },
      { name: 'ShipmentLog', schema: ShipmentLogSchema}]),
  ],
  controllers: [FindShipmentController],
  providers: [DatabaseService, CalculateShipmentsService],
})
export class FindShipmentModule {}
