import { SubgrupoOrderError, SubgrupoService } from './subgrupo.service';

describe('SubgrupoService order', () => {
  const query = (value: any) => ({ exec: jest.fn().mockResolvedValue(value) });

  it('rejects duplicated child identifiers', async () => {
    const service = new SubgrupoService({} as any);

    await expect(service.reorderChildren('padre', ['a', 'a']))
      .rejects.toMatchObject({ status: 400 });
  });

  it('rejects children that belong to a different parent', async () => {
    const model: any = {
      findById: jest.fn().mockReturnValue(query({ _id: 'padre', hijos: ['a'] })),
      find: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnValue(query([{ _id: 'a' }])),
        }),
      }),
    };
    const service = new SubgrupoService(model);

    await expect(service.reorderChildren('padre', ['otro']))
      .rejects.toMatchObject({ status: 409 });
  });

  it('replaces the complete child array atomically', async () => {
    const actualizado = { _id: 'padre', hijos: ['b', 'a'] };
    const model: any = {
      findById: jest.fn().mockReturnValue(query({ _id: 'padre', hijos: ['a', 'b'] })),
      find: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnValue(query([{ _id: 'a' }, { _id: 'b' }])),
        }),
      }),
      findOneAndUpdate: jest.fn().mockReturnValue(query(actualizado)),
    };
    const service = new SubgrupoService(model);

    await expect(service.reorderChildren('padre', ['b', 'a']))
      .resolves.toEqual(actualizado);
    expect(model.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: 'padre', hijos: ['a', 'b'] },
      expect.objectContaining({ $set: expect.objectContaining({ hijos: ['b', 'a'] }) }),
      { new: true },
    );
  });

  it('reports a concurrent modification instead of overwriting it', async () => {
    const model: any = {
      findById: jest.fn().mockReturnValue(query({ _id: 'padre', hijos: ['a'] })),
      find: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnValue(query([{ _id: 'a' }])),
        }),
      }),
      findOneAndUpdate: jest.fn().mockReturnValue(query(null)),
    };
    const service = new SubgrupoService(model);

    await expect(service.reorderChildren('padre', ['a']))
      .rejects.toMatchObject({ status: 409 });
    await expect(service.reorderChildren('padre', ['a']))
      .rejects.toEqual(expect.any(SubgrupoOrderError));
  });

  it('uses creation date order when the parent is a plan', async () => {
    const hijos = [{ _id: 'a' }, { _id: 'b' }];
    const sort = jest.fn().mockReturnValue(query(hijos));
    const model: any = {
      find: jest.fn().mockReturnValue({ sort }),
      findById: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnValue(query(null)),
        }),
      }),
    };
    const service = new SubgrupoService(model);

    await expect(service.hijos('plan')).resolves.toEqual(hijos);
    expect(sort).toHaveBeenCalledWith({ fecha_creacion: 1, _id: 1 });
  });

  it('uses the parent child array for nested levels', async () => {
    const hijos = [
      { _id: 'a', fecha_creacion: new Date('2020-01-01') },
      { _id: 'b', fecha_creacion: new Date('2021-01-01') },
    ];
    const model: any = {
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue(query(hijos)),
      }),
      findById: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnValue(query({ hijos: ['b', 'a'] })),
        }),
      }),
    };
    const service = new SubgrupoService(model);

    const resultado = await service.hijos('padre');
    expect(resultado.map(hijo => hijo._id)).toEqual(['b', 'a']);
  });
});
