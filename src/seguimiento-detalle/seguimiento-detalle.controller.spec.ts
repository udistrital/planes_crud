import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientoDetalleController as SeguimientoDetalleController } from './seguimiento-detalle.controller';

describe('SeguimientoDetalleController', () => {
  let controller: SeguimientoDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguimientoDetalleController],
    }).compile();

    controller = module.get<SeguimientoDetalleController>(SeguimientoDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
