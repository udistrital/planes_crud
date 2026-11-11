import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { ElementoCatalogoService } from './elemento-catalogo.service';
import {
  ActualizarElementoCatalogoDto,
  CrearElementoCatalogoDto,
} from './dto/elemento-catalogo.dto';
import { ElementoCatalogo } from './schemas/elemento-catalogo.schema';

const consulta = <T>(valor: T) => ({
  exec: jest.fn().mockResolvedValue(valor),
});

const programa = (
  parcial: Partial<CrearElementoCatalogoDto> = {},
): CrearElementoCatalogoDto => ({
  catalogo: 'programas_pnd',
  codigo: ' 4501 ',
  nombre: ' Fomento del desarrollo de competencias ',
  padre: '45',
  orden: 1,
  ...parcial,
});

describe('ElementoCatalogoService', () => {
  let modelo: {
    create: jest.Mock;
    bulkWrite: jest.Mock;
    findByIdAndUpdate: jest.Mock;
  };
  let servicio: ElementoCatalogoService;

  beforeEach(() => {
    modelo = {
      create: jest.fn(),
      bulkWrite: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };
    servicio = new ElementoCatalogoService(
      modelo as unknown as Model<ElementoCatalogo>,
    );
  });

  describe('cargarLote', () => {
    it('crea o actualiza por catalogo + codigo, con los textos limpios y activo', async () => {
      modelo.bulkWrite.mockResolvedValue({
        upsertedCount: 1,
        modifiedCount: 0,
      });

      await expect(
        servicio.cargarLote([programa(), programa({ codigo: '4502' })]),
      ).resolves.toEqual({
        recibidos: 2,
        creados: 1,
        actualizados: 0,
        sin_cambios: 1,
      });

      const [operaciones, opciones] = modelo.bulkWrite.mock.calls[0];
      expect(operaciones[0]).toEqual({
        updateOne: {
          filter: { catalogo: 'programas_pnd', codigo: '4501' },
          update: {
            $set: {
              nombre: 'Fomento del desarrollo de competencias',
              padre: '45',
              orden: 1,
              activo: true,
            },
          },
          upsert: true,
        },
      });
      expect(opciones).toEqual({ ordered: false });
    });

    it('conserva activo: false si se envía', async () => {
      modelo.bulkWrite.mockResolvedValue({
        upsertedCount: 0,
        modifiedCount: 1,
      });

      await servicio.cargarLote([programa({ activo: false })]);

      const [[operacion]] = modelo.bulkWrite.mock.calls[0];
      expect(operacion.updateOne.update.$set).toEqual(
        expect.objectContaining({ activo: false }),
      );
    });

    it.each([
      ['una lista vacía', []],
      ['algo que no es una lista', {}],
      [
        'un nombre de catálogo inválido',
        [programa({ catalogo: 'Programas PND' })],
      ],
      ['un elemento sin código', [programa({ codigo: '  ' })]],
      ['un elemento sin nombre', [programa({ nombre: undefined })]],
      ['un orden que no es número', [programa({ orden: 'x' as never })]],
      ['un código repetido en el lote', [programa(), programa()]],
      [
        'más de 1000 elementos',
        Array.from({ length: 1001 }, (_, i) => programa({ codigo: String(i) })),
      ],
    ])('rechaza %s', async (_, elementos) => {
      await expect(
        servicio.cargarLote(elementos as CrearElementoCatalogoDto[]),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(modelo.bulkWrite).not.toHaveBeenCalled();
    });
  });

  describe('crear', () => {
    it('responde conflicto si el código ya existe en el catálogo', async () => {
      modelo.create.mockRejectedValue({ code: 11000 });

      await expect(servicio.crear(programa())).rejects.toBeInstanceOf(
        ConflictException,
      );
    });

    it('guarda solo los campos permitidos', async () => {
      modelo.create.mockResolvedValue({});

      await servicio.crear({ ...programa(), _id: 'x' } as never);

      expect(modelo.create.mock.calls[0][0]).not.toHaveProperty('_id');
    });
  });

  describe('actualizar', () => {
    it('no permite cambiar catalogo ni codigo', async () => {
      const dto = {
        catalogo: 'otro',
        codigo: '9',
      } as unknown as ActualizarElementoCatalogoDto;

      await expect(servicio.actualizar('a', dto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(modelo.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('actualiza el nombre y responde no encontrado si no existe', async () => {
      modelo.findByIdAndUpdate.mockReturnValue(consulta(null));

      await expect(
        servicio.actualizar('a', { nombre: 'Nuevo' }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(modelo.findByIdAndUpdate).toHaveBeenCalledWith(
        'a',
        { $set: { nombre: 'Nuevo' } },
        { new: true, runValidators: true },
      );
    });
  });
});
