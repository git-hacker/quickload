import { Test, TestingModule } from '@nestjs/testing';
import { FindShipmentController } from './find-shipment.controller';

describe('FindShipment Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FindShipmentController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: FindShipmentController = module.get<FindShipmentController>(FindShipmentController);
    expect(controller).toBeDefined();
  });
});
