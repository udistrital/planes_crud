import { Test, TestingModule } from '@nestjs/testing';
import { TipoSeguimientoController } from './tipo-seguimiento.controller';

describe('TipoSeguimientoController', () => {
  let controller: TipoSeguimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoSeguimientoController],
    }).compile();

    controller = module.get<TipoSeguimientoController>(TipoSeguimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
