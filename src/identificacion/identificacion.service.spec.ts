import { Model, model } from 'mongoose';
import { IdentificacionService } from './identificacion.service';
import { Identificacion, IdentificacionSchema } from './schemas/identificacion.schema';

describe('IdentificacionService.put', () => {
  const identificacionModel = model<Identificacion>(
    'IdentificacionPutTest',
    IdentificacionSchema,
  );
  const service = new IdentificacionService(identificacionModel as Model<Identificacion>);

  afterEach(() => jest.restoreAllMocks());

  it('valida el cuerpo recibido y actualiza la identificación', async () => {
    const dto = {
      nombre: 'Identificación',
      descripcion: 'Prueba',
      plan_id: 'plan-id',
      dato: JSON.stringify({ 0: { activo: true } }),
      tipo_identificacion_id: 'tipo-id',
      activo: true,
      fecha_creacion: new Date(),
    } as any;
    const saved = { ...dto, _id: 'identificacion-id' };
    const update = jest.spyOn(identificacionModel, 'findByIdAndUpdate')
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(saved) } as any);
    jest.spyOn(identificacionModel, 'findById')
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(saved) } as any);

    expect(await service.put('identificacion-id', dto)).toEqual(saved);
    expect(update).toHaveBeenCalledWith('identificacion-id', dto, { new: true });
    expect(dto.fecha_modificacion).toBeInstanceOf(Date);
  });

  it('rechaza un cuerpo vacío sin escribir en MongoDB', async () => {
    const update = jest.spyOn(identificacionModel, 'findByIdAndUpdate');

    const result = await service.put('identificacion-id', {} as any);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toContain('vacío');
    expect(update).not.toHaveBeenCalled();
  });
});
