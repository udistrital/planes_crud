import { SubgrupoController } from './subgrupo.controller';
import { SubgrupoOrderError } from './subgrupo.service';

describe('SubgrupoController order', () => {
  const response = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('uses PUT /subgrupo/:id to reorder children', async () => {
    const service: any = {
      reorderChildren: jest.fn().mockResolvedValue({ _id: 'padre', hijos: ['b', 'a'] }),
    };
    const controller = new SubgrupoController(service, {} as any);
    const res = response();

    await controller.put(res, 'padre', { hijos: ['b', 'a'] } as any);

    expect(service.reorderChildren).toHaveBeenCalledWith('padre', ['b', 'a']);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      Success: true,
      Message: 'Orden actualizado correctamente',
    }));
  });

  it('returns the validation HTTP status', async () => {
    const service: any = {
      reorderChildren: jest.fn().mockRejectedValue(new SubgrupoOrderError(409, 'Conflicto')),
    };
    const controller = new SubgrupoController(service, {} as any);
    const res = response();

    await controller.put(res, 'padre', { hijos: ['a'] } as any);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      Success: false,
      Status: 409,
    }));
  });

  it('uses the ordinary partial update when creation date is present', async () => {
    const fecha = new Date('2026-09-02T10:00:00.000Z');
    const service: any = {
      put: jest.fn().mockResolvedValue({ _id: 'nodo', fecha_creacion: fecha }),
      reorderChildren: jest.fn(),
    };
    const controller = new SubgrupoController(service, {} as any);
    const res = response();

    await controller.put(res, 'nodo', { fecha_creacion: fecha });

    expect(service.put).toHaveBeenCalledWith('nodo', { fecha_creacion: fecha });
    expect(service.reorderChildren).not.toHaveBeenCalled();
  });

  it('does not treat hijos plus ordinary fields as an internal reorder', async () => {
    const body = { hijos: ['a'], nombre: 'Nodo' };
    const service: any = {
      put: jest.fn().mockResolvedValue({ _id: 'nodo', ...body }),
      reorderChildren: jest.fn(),
    };
    const controller = new SubgrupoController(service, {} as any);
    const res = response();

    await controller.put(res, 'nodo', body);

    expect(service.put).toHaveBeenCalledWith('nodo', body);
    expect(service.reorderChildren).not.toHaveBeenCalled();
  });
});
