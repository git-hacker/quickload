import { Drivers } from './../interfaces/drivers';
import { DatabaseService } from 'services/database.service';
import { Controller, Get, Query, Res } from '@nestjs/common';

@Controller('find-shipment')
export class FindShipmentController {
  constructor(private db: DatabaseService) {}

  @Get()
  async getShipments(@Query() query: Drivers, @Res() res) {
    if (this.validateDriverInformation(query)) {
      res.status(204).send('Invalid Parameters');
    }

    await this.db.findAllShipments().then((response) => {
        res.status(202).send(response);
    }).catch((err) => {
        res.status(204).send(err);
    });
  }

  validateDriverInformation(driver: Drivers){

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
