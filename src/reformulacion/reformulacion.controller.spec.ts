import { Test, TestingModule } from '@nestjs/testing';
import { ReformulacionController } from './reformulacion.controller';

describe('ReformulacionController', () => {
  let controller: ReformulacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReformulacionController],
    }).compile();

    controller = module.get<ReformulacionController>(ReformulacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
