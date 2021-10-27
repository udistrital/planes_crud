import { Test, TestingModule } from '@nestjs/testing';
import { IdentificacionController } from './identificacion.controller';

describe('IdentificacionController', () => {
  let controller: IdentificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdentificacionController],
    }).compile();

    controller = module.get<IdentificacionController>(IdentificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
