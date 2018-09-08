import { Drivers } from './../interfaces/drivers';
import { Injectable } from '@nestjs/common';
import * as ld from 'lodash';

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
        x = x.filter(item => {
          return item.RequiredTruckInformation.RequiredTruckType.some(
            params => {
              return params === driver.TruckType.Type;
            },
          );
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

  async findCombinations(shipments, driver: Drivers) {
    return await new Promise((resolve, reject) => {
      // create FinalSortedArray
      let FinalSortedArray = [];

      // if shipments are full then they go into finalSortedArray
      FinalSortedArray = shipments.filter(params => {
        return params.RequiredTruckInformation.Full === true;
      });

      shipments = ld.difference(shipments, FinalSortedArray)

      // if destination is selected
      if (driver.Destination) {
        // otherwise run compatibility algo

      } else {

        // sort shipments with same origin and destination into an array
        let destinations = [];

        // loop through all shipments and build array of destinations
        shipments.forEach(element => {
          destinations.push(element.Destination);
        });

        destinations = ld.uniq(destinations);

        // loop through destinations and check against shipments then sort into new array
        destinations.forEach((d) => {
          const x = shipments.filter(s => {
            return s.Destination === d;
          });
          FinalSortedArray.push(x);
        });

        // otherwise run compatibility algo

      }

      // CompatibilityAlgo
      function CompatibilityAlgo() {}

      // SortMixability
      function SortMixability() {
        // if x then proceed to switch
      }

      // SortCombination
      function SortCombination() {
        // run k_combination function
        // check length
        // check weight
      }

      resolve(FinalSortedArray);
    });
  }
}
