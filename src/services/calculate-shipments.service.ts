import { Drivers } from './../interfaces/drivers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateShipmentsService {
  constructor() {}

  async matchDriver(shipments, driver: Drivers) {
    return await new Promise((resolve, reject) => {
      let x = [];

      // check if origin is same
      x = shipments.filter(item => driver.Origin === item.Origin);

      // if destination, check if dest is same
      if (driver.Destination) {
        x = x.filter(item => item.Destination === driver.Destination);
      }

      // check if refrigerated
      if (driver.TruckType.Type === 'Refrigerator') {
        // filter types refrigerator
        x = x.filter(
          item =>
            item.RequiredTruckInformation.RequiredTruckType[0] ===
            'Refrigerator',
        );
        // check length
        x = x.filter(
          item =>
            item.RequiredTruckInformation.Length <= driver.TruckType.Length,
        );
        // check weight
        x = x.filter(
          item =>
            item.RequiredTruckInformation.Weight <= driver.TruckType.Weight,
        );
      } else {
        // check for specific truck type
        x = x.filter( (item) => {
            return item.RequiredTruckInformation.RequiredTruckType.some((params) => {
                return params === driver.TruckType.Type;
            });
        });
        // check length
        x = x.filter(
          item =>
            item.RequiredTruckInformation.Length <= driver.TruckType.Length,
        );
        // check weight
        x = x.filter(
          item =>
            item.RequiredTruckInformation.Weight <= driver.TruckType.Weight,
        );
      }

      if (x.length === 0) {
        reject('No Entries Found');
      } else {
        resolve(x);
      }
    });
  }
}
