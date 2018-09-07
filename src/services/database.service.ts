// import { ShipmentSchema } from './../shipment-schema/shipment-schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipments } from 'interfaces/shipments';
import { ShipmentLog } from 'interfaces/shipmentLog';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('Shipments') private readonly shipmentsmodel: Model<Shipments>,
    @InjectModel('ShipmentLog') private readonly shipmentlogmodel: Model<ShipmentLog>,
  ) {}

  async findAllShipments(): Promise<any> {
    return await this.shipmentsmodel.find().exec();
  }

  async setItemAsShipped(itemID): Promise<any>{
    return await this.shipmentsmodel.findOneAndUpdate({id: itemID}, {Shipped: true}, (err, doc) => {
      return err ? err : doc;
    });
  }

  async createNewLog(logItem){
    const log = new this.shipmentlogmodel(logItem);
    return await log.save();
  }

}
