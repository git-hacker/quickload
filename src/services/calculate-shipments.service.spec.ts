import { Test, TestingModule } from '@nestjs/testing';
import { CalculateShipmentsService } from './calculate-shipments.service';

describe('CalculateShipmentsService', () => {
  let service: CalculateShipmentsService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateShipmentsService],
    }).compile();
    service = module.get<CalculateShipmentsService>(CalculateShipmentsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
