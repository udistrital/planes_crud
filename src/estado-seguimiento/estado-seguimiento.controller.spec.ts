import { Test, TestingModule } from '@nestjs/testing';
import { EstadoSeguimientoController } from './estado-seguimiento.controller';

describe('EstadoSeguimientoController', () => {
  let controller: EstadoSeguimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoSeguimientoController],
    }).compile();

    controller = module.get<EstadoSeguimientoController>(EstadoSeguimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
