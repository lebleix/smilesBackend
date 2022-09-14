import { Test, TestingModule } from '@nestjs/testing';
import { MilesController } from './miles.controller';
import { MilesService } from './miles.service';

describe('MilesController', () => {
  let controller: MilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MilesController],
      providers: [MilesService],
    }).compile();

    controller = module.get<MilesController>(MilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
