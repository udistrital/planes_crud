import { Test, TestingModule } from '@nestjs/testing';
import { SubgrupoDetalleService } from './subgrupo-detalle.service';

describe('SubgrupoDetalleService', () => {
  let service: SubgrupoDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubgrupoDetalleService],
    }).compile();

    service = module.get<SubgrupoDetalleService>(SubgrupoDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
