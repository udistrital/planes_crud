import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { PeriodoSeguimiento } from './schemas/periodo-seguimiento.schema'
import { PeriodoSeguimientoDto } from './dto/periodo-seguimiento.dto';

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class PeriodoSeguimientoService {

  constructor(@InjectModel(PeriodoSeguimiento.name) private readonly periodoSeguimientoModel: Model<PeriodoSeguimiento>) {

  }

  async post(PeriodoSeguimientoDto: PeriodoSeguimientoDto): Promise<PeriodoSeguimiento> {
    try {
      const PeriodoSeguimiento = new this.periodoSeguimientoModel(PeriodoSeguimientoDto);
      PeriodoSeguimiento.fecha_creacion = new Date();
      PeriodoSeguimiento.fecha_modificacion = new Date();
      PeriodoSeguimiento.activo = true;
      this.periodoSeguimientoModel.validate(PeriodoSeguimiento);
      return PeriodoSeguimiento.save();
    } catch (error) {
      return error;
    }
  }

  async getAll(filterDto: FilterDto): Promise<PeriodoSeguimiento[]> {
    const filtersService = new FiltersService(filterDto);
    return await this.periodoSeguimientoModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
      .sort(filtersService.getSortBy())
      .exec();
  }

  async getById(id: string): Promise<PeriodoSeguimiento> {
    try {
      return await this.periodoSeguimientoModel.findById(id).exec();
    } catch (error) {
      return null;
    };

  }

  async put(id: string, PeriodoSeguimientoDto: PeriodoSeguimientoDto): Promise<PeriodoSeguimiento> {
    try {
      PeriodoSeguimientoDto.fecha_modificacion = new Date();
      await this.periodoSeguimientoModel.validate(PeriodoSeguimientoDto);
      await this.periodoSeguimientoModel.findByIdAndUpdate(id, PeriodoSeguimientoDto, { new: true }).exec();
      return await this.periodoSeguimientoModel.findById(id).exec();
    } catch (error) {
      return error;
    }

  }

  async delete(id: string): Promise<any> {
    try {
      return await this.periodoSeguimientoModel.findByIdAndRemove(id).exec();
    } catch (error) {
      return null;
    }

  }
}
