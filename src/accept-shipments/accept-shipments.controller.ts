import { DatabaseService } from 'services/database.service';
import { Controller, Res, Post, Body } from '@nestjs/common';

@Controller('accept-shipments')
export class AcceptShipmentsController {
    constructor(private db: DatabaseService) {}

    @Post()
    async setShippmentasShipped(@Body() body, @Res() res) {

        if (!this.validateShipments(body)){
            res.status(406).send({message: 'Invalid Parameters'});
        } else {
            await body.shipments.forEach(item => {
                this.db.setItemAsShipped(item).then(async () => {
                    await this.db.createNewLog(body).then(() => {

                    }).catch((err) => {
                        res.status(406).send(err);
                    })
                }).catch((err) => {
                    res.status(406).send(err);
                });
            });

            res.status(200).send({message: 'Okay'});
        }

    }

    validateShipments(shipments){
        if (!shipments.driverid) return false;
        if (shipments.shipments.length === 0) return false;
        return true;
    }
}
