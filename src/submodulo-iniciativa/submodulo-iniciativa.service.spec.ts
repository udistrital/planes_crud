import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import {
  ActualizarSubmoduloIniciativaDto,
  AgregarObservacionDto,
} from './dto/submodulo-iniciativa.dto';
import { SubmoduloIniciativaService } from './submodulo-iniciativa.service';
import { SubmoduloIniciativa } from './schemas/submodulo-iniciativa.schema';

const consulta = <T>(valor: T) => ({
  exec: jest.fn().mockResolvedValue(valor),
});

describe('SubmoduloIniciativaService', () => {
  let modelo: {
    findOneAndUpdate: jest.Mock;
    findByIdAndUpdate: jest.Mock;
    exists: jest.Mock;
    insertMany: jest.Mock;
  };
  let servicio: SubmoduloIniciativaService;

  beforeEach(() => {
    modelo = {
      findOneAndUpdate: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      exists: jest.fn(),
      insertMany: jest.fn(),
    };
    servicio = new SubmoduloIniciativaService(
      modelo as unknown as Model<SubmoduloIniciativa>,
    );
  });

  describe('actualizar', () => {
    it('actualiza con la versión vigente y la incrementa en la misma operación', async () => {
      const actualizada = { _id: 'a', version: 4 };
      modelo.findOneAndUpdate.mockReturnValue(consulta(actualizada));

      await expect(
        servicio.actualizar('a', { version: 3, dato: { objeto: 'x' } }),
      ).resolves.toBe(actualizada);

      expect(modelo.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: 'a', version: 3 },
        { $set: { dato: { objeto: 'x' } }, $inc: { version: 1 } },
        { new: true, runValidators: true },
      );
    });

    it('responde conflicto si el submódulo cambió desde que se consultó', async () => {
      modelo.findOneAndUpdate.mockReturnValue(consulta(null));
      modelo.exists.mockReturnValue(consulta({ _id: 'a' }));

      await expect(
        servicio.actualizar('a', { version: 1, dato: {} }),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('responde no encontrado si el submódulo no existe', async () => {
      modelo.findOneAndUpdate.mockReturnValue(consulta(null));
      modelo.exists.mockReturnValue(consulta(null));

      await expect(
        servicio.actualizar('a', { version: 1, dato: {} }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it.each([undefined, -1, 1.5, 'x'])(
      'rechaza la versión %p',
      async (version) => {
        const dto = {
          version,
          dato: {},
        } as unknown as ActualizarSubmoduloIniciativaDto;
        await expect(servicio.actualizar('a', dto)).rejects.toBeInstanceOf(
          BadRequestException,
        );
        expect(modelo.findOneAndUpdate).not.toHaveBeenCalled();
      },
    );

    it('ignora los campos que no se pueden actualizar', async () => {
      const dto = {
        version: 0,
        plan_id: 'otro-plan',
        submodulo: 'otra',
      } as unknown as ActualizarSubmoduloIniciativaDto;

      await expect(servicio.actualizar('a', dto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(modelo.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('no reemplaza las observaciones: el historial solo crece', async () => {
      const dto = {
        version: 0,
        observaciones: [],
      } as unknown as ActualizarSubmoduloIniciativaDto;

      await expect(servicio.actualizar('a', dto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(modelo.findOneAndUpdate).not.toHaveBeenCalled();
    });
  });

  describe('agregarObservacion', () => {
    const observacion = (
      parcial: Partial<AgregarObservacionDto> = {},
    ): AgregarObservacionDto => ({
      texto: '  Precisar la fuente.  ',
      rol: 'PLANEACION',
      usuario: '1012345678',
      ...parcial,
    });

    it('la agrega al historial con fecha, sin tocar la versión', async () => {
      const actualizada = { _id: 'a' };
      modelo.findByIdAndUpdate.mockReturnValue(consulta(actualizada));

      await expect(
        servicio.agregarObservacion('a', observacion()),
      ).resolves.toBe(actualizada);

      const [id, cambios, opciones] = modelo.findByIdAndUpdate.mock.calls[0];
      expect(id).toBe('a');
      expect(cambios.$push.observaciones).toEqual({
        texto: 'Precisar la fuente.',
        rol: 'PLANEACION',
        usuario: '1012345678',
        fecha: expect.any(Date),
      });
      expect(cambios.$inc).toBeUndefined();
      expect(cambios.$set).toBeUndefined();
      expect(opciones).toEqual({ new: true, runValidators: true });
    });

    it('cambia el estado en la misma operación si se envía', async () => {
      modelo.findByIdAndUpdate.mockReturnValue(consulta({ _id: 'a' }));

      await servicio.agregarObservacion(
        'a',
        observacion({ estado_submodulo_id: 'con-observaciones' }),
      );

      const [, cambios] = modelo.findByIdAndUpdate.mock.calls[0];
      expect(cambios.$set).toEqual({
        estado_submodulo_id: 'con-observaciones',
      });
    });

    it('guarda solo texto, rol, usuario y fecha aunque lleguen otros campos', async () => {
      modelo.findByIdAndUpdate.mockReturnValue(consulta({ _id: 'a' }));

      await servicio.agregarObservacion('a', {
        ...observacion(),
        lado: 'planeacion',
        ruta: 'causas_directas[cd-1].linea_base',
      } as unknown as AgregarObservacionDto);

      const [, cambios] = modelo.findByIdAndUpdate.mock.calls[0];
      expect(Object.keys(cambios.$push.observaciones).sort()).toEqual([
        'fecha',
        'rol',
        'texto',
        'usuario',
      ]);
    });

    it.each([
      ['un texto vacío', { texto: '   ' }],
      ['un texto demasiado largo', { texto: 'x'.repeat(4001) }],
      ['un usuario vacío', { usuario: '' }],
      ['un rol vacío', { rol: undefined }],
      ['un estado que no es texto', { estado_submodulo_id: 7 }],
    ])('rechaza %s', async (_, parcial) => {
      await expect(
        servicio.agregarObservacion(
          'a',
          observacion(parcial as Partial<AgregarObservacionDto>),
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(modelo.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('responde no encontrado si el submódulo no existe', async () => {
      modelo.findByIdAndUpdate.mockReturnValue(consulta(null));

      await expect(
        servicio.agregarObservacion('a', observacion()),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('crearLote', () => {
    it('exige al menos un submódulo', async () => {
      await expect(servicio.crearLote([])).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(modelo.insertMany).not.toHaveBeenCalled();
    });

    it('guarda solo los campos de creación', async () => {
      modelo.insertMany.mockResolvedValue([]);
      await servicio.crearLote([
        {
          plan_id: 'p',
          submodulo: 'nombre',
          estado_submodulo_id: 'e',
          version: 9,
        } as never,
      ]);
      expect(modelo.insertMany).toHaveBeenCalledWith(
        [{ plan_id: 'p', submodulo: 'nombre', estado_submodulo_id: 'e' }],
        { ordered: true },
      );
    });
  });
});
