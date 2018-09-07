import { DatabaseService } from 'services/database.service';
import { Controller, Get, Query, Res } from '@nestjs/common';

@Controller('find-shipment')
export class FindShipmentController {
  constructor(private db: DatabaseService) {}

  @Get()
  async getShipments(@Query() query, @Res() res) {
    if (!query) {
      return 'Invalid Parameters';
    }

    await this.db.findAllShipments().then((response) => {
        res.status(202).send(response);
    }).catch((err) => {
        res.status(204).send(err);
    });
  }
}
