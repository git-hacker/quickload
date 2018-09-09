import { Drivers } from './../interfaces/drivers';
import { Injectable } from '@nestjs/common';
import * as ld from 'lodash';

@Injectable()
export class CalculateShipmentsService {
  constructor() {}

   matchDriver(shipments, driver: Drivers) {
    return new Promise((resolve, reject) => {
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

  findCombinations(shipments, driver: Drivers) {
    return new Promise(async (resolve, reject) => {
      // create FinalSortedArray
      let FinalSortedArray = [];

      // if shipments are full then they go into finalSortedArray
      FinalSortedArray = shipments.filter(params => {
        return params.RequiredTruckInformation.Full === true;
      });

      shipments = ld.difference(shipments, FinalSortedArray);

      const tempObjArray = [];
      FinalSortedArray.forEach((object) => {
        tempObjArray.push([object]);
      });

      FinalSortedArray = tempObjArray;

      // if destination is selected
      if (driver.Destination) {
        // otherwise run compatibility algo
        await CompatibilityAlgo();
        await SortCombination();
        await resolve(checkCopies(FinalSortedArray));
      } else {
        // sort shipments with same origin and destination into an array
        let destinations = [];

        // loop through all shipments and build array of destinations
        shipments.forEach(element => {
          destinations.push(element.Destination);
        });

        destinations = ld.uniq(destinations);

        // loop through destinations and check against shipments then sort into new array
        destinations.forEach(d => {
          const x = shipments.filter(s => {
            return s.Destination === d;
          });
          FinalSortedArray.push(x);
        });
        // otherwise run compatibility algo
        await CompatibilityAlgo();
        await SortCombination();
        await resolve(checkCopies(FinalSortedArray));
        // resolve(FinalSortedArray);
      }

      // CompatibilityAlgo
      async function CompatibilityAlgo() {
        await SeparateCombinationsOut().then(async params => {
          await params.forEach(async ships => {

            await ships.forEach(async s => {
              let a = [];
              a = await ships.filter(el => {
                return CheckMixability(
                  s.CargoInformation.TypeName[0],
                  el.CargoInformation.TypeName[0],
                );
              });
              FinalSortedArray.push(a);
            });
          });
        });

        FinalSortedArray = await ld.uniq(FinalSortedArray);
      }

      // seperate out combination arrays
      async function SeparateCombinationsOut() {
        const temp = [];
        await FinalSortedArray.forEach(async shipment => {
          if (shipment.length > 1) {
            await temp.push(shipment);
          }
        });
        FinalSortedArray = ld.difference(FinalSortedArray, temp);
        return temp;
      }

      // SortCombination
      async function SortCombination() {
        await SeparateCombinationsOut().then(async params => {
          let deleteArray = [];
          await params.forEach(async levelOne => {
            for (let i = 3; i > 0; i--) {

              let combs = k_combinations(levelOne, i);

              if (deleteArray.length !== 0) {
                deleteArray = await ld.uniq(deleteArray);
                combs = ld.difference(combs, deleteArray);
              }

              await combs.forEach(async a => {
                let totalWeight = 0,
                  totalLength = 0;

                await a.forEach(shipment => {
                  totalWeight += shipment.RequiredTruckInformation.Weight;
                  totalLength += shipment.RequiredTruckInformation.Length;
                });

                if (
                  totalLength <= driver.TruckType.Length &&
                  totalWeight <= driver.TruckType.Weight
                ) {
                  FinalSortedArray.push(a);
                  deleteArray = k_combinations(a, i - 1);
                }
              });
            }

            params = await ld.uniq(params);
          });

          FinalSortedArray = await ld.uniq(FinalSortedArray);
        });
      }

      function k_combinations(set, k) {
        let i, j, combs, head, tailcombs;

        // There is no way to take e.g. sets of 5 elements from
        // a set of 4.
        if (k > set.length || k <= 0) {
          return [];
        }

        // K-sized set has only one K-sized subset.
        if (k === set.length) {
          return [set];
        }

        // There is N 1-sized subsets in a N-sized set.
        if (k === 1) {
          combs = [];
          for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
          }
          return combs;
        }

        combs = [];
        for (i = 0; i < set.length - k + 1; i++) {
          // head is a list that includes only our current element.
          head = set.slice(i, i + 1);
          // We take smaller combinations from the subsequent elements
          tailcombs = k_combinations(set.slice(i + 1), k - 1);
          // For each (k-1)-combination we join it with the current
          // and store it to the set of k-combinations.
          for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
          }
        }
        return combs;
      }

      async function checkCopies(array) {
        for (let i = 0; i < array.length - 1; i++) {
          if (array[i].length === array[i + 1].length) {
            if (array[i][0].ShipperName === array[i + 1][0].ShipperName) {
              if (array[i][1].ShipperName === array[i + 1].ShipperName) {
                if (array[i][2].ShipperName === array[i + 1][2].ShipperName) {
                  array = ld.pullAt(array, array[i++]);
                }
              }
            }
          }
        }
        return array;
      }

      // SortMixability
      function CheckMixability(x, y) {
        // if x then proceed to switch
        switch (x) {
          case 'Regular':
            switch (y) {
              case 'Regular':
                return true;
              case 'Heavy':
                return true;
              case 'Construction':
                return true;
              case 'Chemicals':
                return false;
              case 'Food':
                return false;
              default:
                return false;
            }
          case 'Heavy':
            switch (y) {
              case 'Regular':
                return true;
              case 'Heavy':
                return true;
              case 'Construction':
                return true;
              case 'Chemicals':
                return false;
              case 'Food':
                return false;
              default:
                return false;
            }
          case 'Construction':
            switch (y) {
              case 'Regular':
                return true;
              case 'Heavy':
                return true;
              case 'Construction':
                return true;
              case 'Chemicals':
                return false;
              case 'Food':
                return false;
              default:
                return false;
            }
          case 'Chemicals':
            switch (y) {
              case 'Regular':
                return false;
              case 'Heavy':
                return false;
              case 'Construction':
                return false;
              case 'Chemicals':
                return true;
              case 'Food':
                return false;
              default:
                return false;
            }
          case 'Food':
            switch (y) {
              case 'Regular':
                return false;
              case 'Heavy':
                return false;
              case 'Construction':
                return false;
              case 'Chemicals':
                return false;
              case 'Food':
                return true;
              default:
                return false;
            }
          default:
            return false;
        }
      }
    });
  }
}
