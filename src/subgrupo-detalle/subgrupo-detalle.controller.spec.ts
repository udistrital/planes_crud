import { Test, TestingModule } from '@nestjs/testing';
import { SubgrupoDetalleController } from './subgrupo-detalle.controller';

describe('SubgrupoDetalleController', () => {
  let controller: SubgrupoDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubgrupoDetalleController],
    }).compile();

    controller = module.get<SubgrupoDetalleController>(SubgrupoDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
