import { Test, TestingModule } from '@nestjs/testing';
import { SmilesController } from './smiles.controller';
import { SmilesService } from './smiles.service';

describe('SmilesController', () => {
  let controller: SmilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmilesController],
      providers: [SmilesService],
    }).compile();

    controller = module.get<SmilesController>(SmilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
