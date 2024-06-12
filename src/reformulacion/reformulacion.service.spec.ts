import { Test, TestingModule } from '@nestjs/testing';
import { ReformulacionService } from './reformulacion.service';

describe('ReformulacionService', () => {
  let service: ReformulacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReformulacionService],
    }).compile();

    service = module.get<ReformulacionService>(ReformulacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
