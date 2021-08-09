import { Test, TestingModule } from '@nestjs/testing';
import { SubgrupoService } from './subgrupo.service';

describe('SubgrupoService', () => {
  let service: SubgrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubgrupoService],
    }).compile();

    service = module.get<SubgrupoService>(SubgrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
