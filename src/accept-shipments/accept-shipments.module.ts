import { Module, HttpModule } from '@nestjs/common';
import { AcceptShipmentsController } from './accept-shipments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from 'services/database.service';
import { ShipmentSchema } from 'schemas/shipment-schema/shipment-schema';
import { ShipmentLogSchema } from './../schemas/shipment-log/shipment-log-schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'Shipments', schema: ShipmentSchema },
      { name: 'ShipmentLog', schema: ShipmentLogSchema}]),
  ],
  controllers: [AcceptShipmentsController],
  providers: [DatabaseService],
})
export class AcceptShipmentsModule {}
