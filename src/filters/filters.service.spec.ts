import { BadRequestException } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';
import { FiltersService } from './filters.service';

describe('FiltersService', () => {
  it('uses zero as a safe offset when pagination values are omitted', () => {
    const filters = new FiltersService({
      query: 'codigo_abreviacion:PLI_SP,activo:true',
    } as FilterDto);

    expect(filters.getQuery()).toEqual({
      codigo_abreviacion: 'PLI_SP',
      activo: 'true',
    });
    expect(filters.getLimitAndOffset()).toEqual({ skip: 0 });
  });

  it('returns parsed pagination values when they are valid', () => {
    const filters = new FiltersService({ limit: '10', offset: '20' } as FilterDto);

    expect(filters.getLimitAndOffset()).toEqual({ limit: 10, skip: 20 });
  });

  it.each([
    ['limit', '-1'],
    ['limit', 'ten'],
    ['offset', '1.5'],
  ])('rejects invalid %s values with a specific error', (parameter, value) => {
    const filters = new FiltersService({ [parameter]: value } as unknown as FilterDto);

    expect(() => filters.getLimitAndOffset()).toThrow(BadRequestException);
    expect(() => filters.getLimitAndOffset()).toThrow(
      `El parametro ${parameter} debe ser un numero entero mayor o igual a 0.`,
    );
  });

  it('rejects malformed query expressions with a specific error', () => {
    const filters = new FiltersService({ query: 'activo' } as FilterDto);

    expect(() => filters.getQuery()).toThrow(
      'El filtro query "activo" no es valido. Use el formato campo:valor.',
    );
  });

  it('rejects pagination values outside the safe integer range', () => {
    const filters = new FiltersService({
      offset: '999999999999999999999999',
    } as FilterDto);

    expect(() => filters.getLimitAndOffset()).toThrow(
      'El parametro offset excede el valor maximo permitido.',
    );
  });

  it('preserves colons contained in a query value', () => {
    const filters = new FiltersService({ query: 'hora:10:30' } as FilterDto);

    expect(filters.getQuery()).toEqual({ hora: '10:30' });
  });

  it('rejects unsupported sort orders', () => {
    const filters = new FiltersService({
      sortby: 'nombre',
      order: 'up',
    } as FilterDto);

    expect(() => filters.getSortBy()).toThrow(
      'El valor "up" de order no es valido. Use asc o desc.',
    );
  });
});
