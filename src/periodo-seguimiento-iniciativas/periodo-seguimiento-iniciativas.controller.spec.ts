import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoSeguimientoIniciativasController } from './periodo-seguimiento-iniciativas.controller';
import { PeriodoSeguimientoIniciativasService } from './periodo-seguimiento-iniciativas.service';

describe('PeriodoSeguimientoIniciativasController', () => {
  let controller: PeriodoSeguimientoIniciativasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodoSeguimientoIniciativasController],
      providers: [{ provide: PeriodoSeguimientoIniciativasService, useValue: {} }],
    }).compile();

    controller = module.get<PeriodoSeguimientoIniciativasController>(PeriodoSeguimientoIniciativasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
