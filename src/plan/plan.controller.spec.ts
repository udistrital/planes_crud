import { HttpStatus } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

describe('PlanController.put', () => {
  const service = { put: jest.fn() };
  const controller = new PlanController(service as unknown as PlanService);
  const res = { status: jest.fn(), json: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    res.status.mockReturnValue(res);
    res.json.mockImplementation((body) => body);
  });

  it('expone el mensaje de validación y responde 400', async () => {
    service.put.mockResolvedValue(new Error('estado_plan_id inválido'));

    const respuesta = await controller.put(res, 'plan-id', {} as any);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(respuesta).toMatchObject({ Success: false, Status: '400', Message: 'estado_plan_id inválido' });
  });

  it('no reporta éxito cuando el plan no existe', async () => {
    service.put.mockResolvedValue(null);

    const respuesta = await controller.put(res, 'plan-id', {} as any);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(respuesta).toMatchObject({ Success: false, Status: '404' });
  });
});
