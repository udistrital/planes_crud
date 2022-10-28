import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoSeguimientoController } from './periodo-seguimiento.controller';

describe('PeriodoSeguimientoController', () => {
  let controller: PeriodoSeguimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodoSeguimientoController],
    }).compile();

    controller = module.get<PeriodoSeguimientoController>(PeriodoSeguimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
