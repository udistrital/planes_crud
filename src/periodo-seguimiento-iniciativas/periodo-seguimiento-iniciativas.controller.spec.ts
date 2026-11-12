import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoSeguimientoIniciativasController } from './periodo-seguimiento-iniciativas.controller';

describe('PeriodoSeguimientoIniciativasController', () => {
  let controller: PeriodoSeguimientoIniciativasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodoSeguimientoIniciativasController],
    }).compile();

    controller = module.get<PeriodoSeguimientoIniciativasController>(PeriodoSeguimientoIniciativasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
