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
});
