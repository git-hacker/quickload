import { Test, TestingModule } from '@nestjs/testing';
import { AcceptShipmentsController } from './accept-shipments.controller';

describe('AcceptShipments Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AcceptShipmentsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AcceptShipmentsController = module.get<AcceptShipmentsController>(AcceptShipmentsController);
    expect(controller).toBeDefined();
  });
});
