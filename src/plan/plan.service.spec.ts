import { Model, model } from 'mongoose';
import { PlanService } from './plan.service';
import { Plan, PlanSchema } from './schemas/plan.schema';

describe('PlanService.put', () => {
  const planModel = model<Plan>('PlanPutTest', PlanSchema);
  const service = new PlanService(planModel as Model<Plan>);

  afterEach(() => jest.restoreAllMocks());

  it('valida y devuelve el estado realmente guardado', async () => {
    const dto = {
      nombre: 'Plan',
      descripcion: 'Plan de acción',
      tipo_plan_id: 'tipo-id',
      aplicativo_id: 'aplicativo-id',
      estado_plan_id: 'estado-nuevo',
      activo: true,
      fecha_creacion: new Date(),
    } as any;
    const guardado = { ...dto, _id: 'plan-id' };
    const update = jest.spyOn(planModel, 'findByIdAndUpdate')
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(guardado) } as any);

    expect(await service.put('plan-id', dto)).toEqual(guardado);
    expect(update).toHaveBeenCalledWith('plan-id', dto, {
      new: true,
      runValidators: true,
    });
  });

  it('rechaza un cuerpo vacío sin actualizar el plan', async () => {
    const update = jest.spyOn(planModel, 'findByIdAndUpdate');

    const resultado = await service.put('plan-id', {} as any);

    expect(resultado).toBeInstanceOf(Error);
    expect((resultado as Error).message).toContain('vacío');
    expect(update).not.toHaveBeenCalled();
  });
});
