import { Test, TestingModule } from '@nestjs/testing';
import { MilesService } from './miles.service';

describe('MilesService', () => {
  let service: MilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilesService],
    }).compile();

    service = module.get<MilesService>(MilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
