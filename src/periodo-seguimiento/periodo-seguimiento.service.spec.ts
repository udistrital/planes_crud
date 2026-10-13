import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PeriodoSeguimientoService } from './periodo-seguimiento.service';
import { PeriodoSeguimiento } from './schemas/periodo-seguimiento.schema';

describe('PeriodoSeguimientoService', () => {
  let service: PeriodoSeguimientoService;
  let find: jest.Mock;
  let exec: jest.Mock;

  beforeEach(async () => {
    exec = jest.fn();
    find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({ exec }),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeriodoSeguimientoService,
        {
          provide: getModelToken(PeriodoSeguimiento.name),
          useValue: { find },
        },
      ],
    }).compile();

    service = module.get<PeriodoSeguimientoService>(PeriodoSeguimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('busca el caso 3 sin expresiones regulares sobre el JSON serializado', async () => {
    exec.mockResolvedValue([
      {
        _id: 'registro-coincidente',
        unidades_interes:
          '[{"Id":7,"Nombre":"RECTORIA"},{"Id":272,"Nombre":"FACULTAD DE CIENCIAS DE LA SALUD"}]',
        planes_interes:
          '[{"_id":"plan-2027","nombre":"Plan de Acción 2027"}]',
      },
      {
        _id: 'registro-no-coincidente',
        unidades_interes:
          '[{"Id":42,"Nombre":"CATEDRA UNESCO EN DESARROLLO DEL NINO"}]',
        planes_interes:
          '[{"_id":"plan-2027","nombre":"Plan de Acción 2027"}]',
      },
    ]);

    const resultado = await service.obtenerRegistrosExistencia(
      {
        unidades_interes:
          '[{"Id":272,"Nombre":"FACULTAD DE CIENCIAS DE LA SALUD"}]',
        periodo_id: '49',
        tipo_seguimiento_id: '6260e975ebe1e6498f7404ee',
      } as any,
      3,
    );

    expect(find).toHaveBeenCalledWith({
      periodo_id: '49',
      tipo_seguimiento_id: '6260e975ebe1e6498f7404ee',
      activo: true,
      nueva_estructura: true,
    });
    expect(resultado.map((registro) => registro._id)).toEqual(['registro-coincidente']);
  });
});
