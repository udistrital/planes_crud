import { BadRequestException } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';

type FindOptions = {
  skip: number;
  limit?: number;
};

export class FiltersService {
  constructor(private readonly filterDto: FilterDto = {} as FilterDto) {}

  getQuery(): Record<string, string> {
    const queryObj: Record<string, string> = {};
    if (!this.filterDto.query) {
      return queryObj;
    }

    this.filterDto.query.split(',').forEach((property) => {
      const separatorIndex = property.indexOf(':');
      if (separatorIndex <= 0 || separatorIndex === property.length - 1) {
        throw new BadRequestException(
          `El filtro query "${property}" no es valido. Use el formato campo:valor.`,
        );
      }

      const field = property.slice(0, separatorIndex).trim();
      const value = property.slice(separatorIndex + 1).trim();
      this.validateField(field, 'query');

      if (!value) {
        throw new BadRequestException(
          `El campo "${field}" del parametro query debe tener un valor.`,
        );
      }

      queryObj[field] = value;
    });

    return queryObj;
  }

  getFields(): Record<string, 1> {
    const fieldsObj: Record<string, 1> = {};
    if (!this.filterDto.fields) {
      return fieldsObj;
    }

    this.filterDto.fields.split(',').forEach((property) => {
      const field = property.trim();
      this.validateField(field, 'fields');
      fieldsObj[field] = 1;
    });

    return fieldsObj;
  }

  getSortBy(): Array<[string, 1 | -1]> {
    if (!this.filterDto.sortby) {
      if (this.filterDto.order) {
        throw new BadRequestException(
          'El parametro order requiere el parametro sortby.',
        );
      }
      return [];
    }

    const sortFields = this.filterDto.sortby.split(',').map((field) => {
      const normalizedField = field.trim();
      this.validateField(normalizedField, 'sortby');
      return normalizedField;
    });

    if (!this.filterDto.order) {
      return sortFields.map((field): [string, 1 | -1] => [field, 1]);
    }

    const orders: Array<1 | -1> = this.filterDto.order
      .split(',')
      .map((order) => {
        const normalizedOrder = order.trim().toLowerCase();
        if (normalizedOrder !== 'asc' && normalizedOrder !== 'desc') {
          throw new BadRequestException(
            `El valor "${order}" de order no es valido. Use asc o desc.`,
          );
        }
        return normalizedOrder === 'desc' ? -1 : 1;
      });

    if (orders.length !== 1 && orders.length !== sortFields.length) {
      throw new BadRequestException(
        'order debe tener un unico valor o la misma cantidad de valores que sortby.',
      );
    }

    return sortFields.map(
      (field, index): [string, 1 | -1] => [
        field,
        orders.length === 1 ? orders[0] : orders[index],
      ],
    );
  }

  getLimitAndOffset(): FindOptions {
    const options: FindOptions = { skip: 0 };

    if (this.filterDto.offset !== undefined && this.filterDto.offset !== '') {
      options.skip = this.parseNonNegativeInteger(
        'offset',
        this.filterDto.offset,
      );
    }

    if (this.filterDto.limit !== undefined && this.filterDto.limit !== '') {
      options.limit = this.parseNonNegativeInteger(
        'limit',
        this.filterDto.limit,
      );
    }

    return options;
  }

  isPopulated(): boolean {
    if (
      this.filterDto.populate !== undefined &&
      this.filterDto.populate !== 'true' &&
      this.filterDto.populate !== 'false'
    ) {
      throw new BadRequestException(
        'El parametro populate debe ser true o false.',
      );
    }
    return this.filterDto.populate === 'true';
  }

  private parseNonNegativeInteger(parameter: string, value: string): number {
    if (!/^\d+$/.test(value)) {
      throw new BadRequestException(
        `El parametro ${parameter} debe ser un numero entero mayor o igual a 0.`,
      );
    }

    const parsedValue = Number(value);
    if (!Number.isSafeInteger(parsedValue)) {
      throw new BadRequestException(
        `El parametro ${parameter} excede el valor maximo permitido.`,
      );
    }

    return parsedValue;
  }

  private validateField(field: string, parameter: string): void {
    if (!/^[a-zA-Z_][a-zA-Z0-9_.]*$/.test(field)) {
      throw new BadRequestException(
        `El campo "${field}" del parametro ${parameter} no es valido.`,
      );
    }
  }
}
