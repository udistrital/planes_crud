import { Test, TestingModule } from '@nestjs/testing';
import { PeriodoSeguimientoService } from './periodo-seguimiento.service';

describe('PeriodoSeguimientoService', () => {
  let service: PeriodoSeguimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodoSeguimientoService],
    }).compile();

    service = module.get<PeriodoSeguimientoService>(PeriodoSeguimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
