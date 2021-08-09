import { Test, TestingModule } from '@nestjs/testing';
import { TipoPlanController } from './tipo-plan.controller';

describe('TipoPlanController', () => {
  let controller: TipoPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoPlanController],
    }).compile();

    controller = module.get<TipoPlanController>(TipoPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
