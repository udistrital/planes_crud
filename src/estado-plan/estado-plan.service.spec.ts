import { Test, TestingModule } from '@nestjs/testing';
import { EstadoPlanService } from './estado-plan.service';

describe('EstadoPlanService', () => {
  let service: EstadoPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoPlanService],
    }).compile();

    service = module.get<EstadoPlanService>(EstadoPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
