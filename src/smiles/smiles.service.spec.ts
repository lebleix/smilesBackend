import { Test, TestingModule } from '@nestjs/testing';
import { SmilesService } from './smiles.service';

describe('SmilesService', () => {
  let service: SmilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmilesService],
    }).compile();

    service = module.get<SmilesService>(SmilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
