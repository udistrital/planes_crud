import { Test, TestingModule } from '@nestjs/testing';
import { TipoPlanService } from './tipo-plan.service';

describe('TipoPlanService', () => {
  let service: TipoPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoPlanService],
    }).compile();

    service = module.get<TipoPlanService>(TipoPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
