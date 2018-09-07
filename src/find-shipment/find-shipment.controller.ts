import { Controller, Get, Query, Body, Res } from '@nestjs/common';

@Controller('find-shipment')
export class FindShipmentController {
    constructor(){}

    @Get()
    async calculateShipments(@Query() query, @Body() body, @Res() res){
        await res.status(202).send();
    }
}
