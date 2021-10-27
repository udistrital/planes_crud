import { Test, TestingModule } from '@nestjs/testing';
import { IdentificacionService } from './identificacion.service';

describe('IdentificacionService', () => {
  let service: IdentificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdentificacionService],
    }).compile();

    service = module.get<IdentificacionService>(IdentificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
