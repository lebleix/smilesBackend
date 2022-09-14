import { Test, TestingModule } from '@nestjs/testing';
import { BestPriceService } from './best-price.service';

describe('BestPriceService', () => {
  let service: BestPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BestPriceService],
    }).compile();

    service = module.get<BestPriceService>(BestPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
