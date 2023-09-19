import { Test, TestingModule } from '@nestjs/testing';
import { IdentificacionDetalleController } from './identificacion-detalle.controller';

describe('IdentificacionDetalleController', () => {
  let controller: IdentificacionDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdentificacionDetalleController],
    }).compile();

    controller = module.get<IdentificacionDetalleController>(IdentificacionDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
