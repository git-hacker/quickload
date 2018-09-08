import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from 'services/database.service';
import { FindShipmentModule } from './find-shipment/find-shipment.module';
import { AcceptShipmentsModule } from './accept-shipments/accept-shipments.module';
import { CalculateShipmentsService } from 'services/calculate-shipments.service';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/quickload'), FindShipmentModule, AcceptShipmentsModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, CalculateShipmentsService],
})
export class AppModule {}
