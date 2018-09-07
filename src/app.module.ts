import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FindShipmentController } from './find-shipment/find-shipment.controller';
import { AcceptShipmentController } from './accept-shipment/accept-shipment.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/quickload')],
  controllers: [AppController, FindShipmentController, AcceptShipmentController],
  providers: [AppService],
})
export class AppModule {}
