import { CalculateShipmentsService } from 'services/calculate-shipments.service';
import { Drivers } from './../interfaces/drivers';
import { DatabaseService } from 'services/database.service';
import { Controller, Res, Post, Body } from '@nestjs/common';

@Controller('find-shipment')
export class FindShipmentController {
  constructor(
    private db: DatabaseService,
    private calculate: CalculateShipmentsService,
    ) {}

  @Post()
  async getShipments(@Body() body, @Res() res) {
    if (!this.validateDriverInformation(body)) {
      res.status(406).send({message: 'Invalid Parameters'});
    } else {
      await this.db
        .findAllShipments()
        .then(async response => {
          await this.calculate.matchDriver(response, body).then((xx) => {
            res.status(202).send(xx);
          }).catch((err) => {
            res.status(204).send({message: 'Error with calculations: ' + err});
          });
        })
        .catch(err => {
          res.status(204).send(err);
        });
    }
  }

  validateDriverInformation(driver: Drivers) {
    if (typeof driver.id !== 'string') return false;
    if (typeof driver.Name !== 'string') return false;
    if (typeof driver.License !== 'number') return false;
    if (typeof driver.Origin !== 'string') return false;
    if (typeof driver.TruckType.Length !== 'number') return false;
    if (typeof driver.TruckType.Weight !== 'number') return false;
    if (typeof driver.TruckType.Axels !== 'number') return false;
    if (typeof driver.TruckType.Type !== 'string') return false;
    return true;
  }
}
