import { Test, TestingModule } from '@nestjs/testing';
import { IdentificacionDetalleService } from './identificacion-detalle.service';

describe('IdentificacionDetalleService', () => {
  let service: IdentificacionDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdentificacionDetalleService],
    }).compile();

    service = module.get<IdentificacionDetalleService>(IdentificacionDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
