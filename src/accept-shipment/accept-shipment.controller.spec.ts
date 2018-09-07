import { Test, TestingModule } from '@nestjs/testing';
import { AcceptShipmentController } from './accept-shipment.controller';

describe('AcceptShipment Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AcceptShipmentController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AcceptShipmentController = module.get<AcceptShipmentController>(AcceptShipmentController);
    expect(controller).toBeDefined();
  });
});
