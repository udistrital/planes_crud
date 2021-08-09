import { Test, TestingModule } from '@nestjs/testing';
import { SubgrupoController } from './subgrupo.controller';

describe('SubgrupoController', () => {
  let controller: SubgrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubgrupoController],
    }).compile();

    controller = module.get<SubgrupoController>(SubgrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
