import { Test, TestingModule } from '@nestjs/testing';
import { TipoIdentificacionService } from './tipo-identificacion.service';

describe('TipoIdentificacionService', () => {
  let service: TipoIdentificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoIdentificacionService],
    }).compile();

    service = module.get<TipoIdentificacionService>(TipoIdentificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
