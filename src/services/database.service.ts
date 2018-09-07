// import { ShipmentSchema } from './../shipment-schema/shipment-schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipments } from 'interfaces/shipments';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('Shipments') private readonly shipmentsmodel: Model<Shipments>,
  ) {}

  async findAllShipments(): Promise<any> {
    return await this.shipmentsmodel.find().exec();
  }
}
