import { Test, TestingModule } from '@nestjs/testing';
import { TipoIdentificacionController } from './tipo-identificacion.controller';

describe('TipoIdentificacionController', () => {
  let controller: TipoIdentificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoIdentificacionController],
    }).compile();

    controller = module.get<TipoIdentificacionController>(TipoIdentificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
