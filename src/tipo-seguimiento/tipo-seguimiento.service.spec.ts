import { Test, TestingModule } from '@nestjs/testing';
import { TipoSeguimientoService } from './tipo-seguimiento.service';

describe('TipoSeguimientoService', () => {
  let service: TipoSeguimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoSeguimientoService],
    }).compile();

    service = module.get<TipoSeguimientoService>(TipoSeguimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
