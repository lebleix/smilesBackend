import { Test, TestingModule } from '@nestjs/testing';
import { BestPriceController } from './best-price.controller';
import { BestPriceService } from './best-price.service';

describe('BestPriceController', () => {
  let controller: BestPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BestPriceController],
      providers: [BestPriceService],
    }).compile();

    controller = module.get<BestPriceController>(BestPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
