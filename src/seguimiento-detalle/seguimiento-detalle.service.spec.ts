import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientoDetalleService } from './seguimiento-detalle.service';

describe('SeguimientoDetalleService', () => {
  let service: SeguimientoDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguimientoDetalleService],
    }).compile();

    service = module.get<SeguimientoDetalleService>(SeguimientoDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
