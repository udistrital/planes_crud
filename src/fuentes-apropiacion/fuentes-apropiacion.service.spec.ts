import { Test, TestingModule } from '@nestjs/testing';
import { FuentesApropiacionService } from './fuentes-apropiacion.service';

describe('PeriodoSeguimientoService', () => {
  let service: FuentesApropiacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuentesApropiacionService],
    }).compile();

    service = module.get<FuentesApropiacionService>(FuentesApropiacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
