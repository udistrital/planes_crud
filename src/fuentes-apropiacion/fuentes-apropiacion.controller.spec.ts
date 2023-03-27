import { Test, TestingModule } from '@nestjs/testing';
import { FuentesApropiacionController } from './fuentes-apropiacion.controller';

describe('FuentesApropiacionController', () => {
  let controller: FuentesApropiacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuentesApropiacionController],
    }).compile();

    controller = module.get<FuentesApropiacionController>(FuentesApropiacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
