import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { FuentesApropiacion } from './schemas/fuentes-apropiacion.schema'
import { FuentesApropiacionDto } from './dto/fuentes-apropiacion.dto';

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class FuentesApropiacionService {

  constructor(@InjectModel(FuentesApropiacion.name) private readonly fuentesApropiacionModel: Model<FuentesApropiacion>) {

  }

  async post(FuentesApropiacionDto: FuentesApropiacionDto): Promise<FuentesApropiacion> {
    try {
      const FuentesApropiacion = new this.fuentesApropiacionModel(FuentesApropiacionDto);
      FuentesApropiacion.fecha_creacion = new Date();
      FuentesApropiacion.fecha_modificacion = new Date();
      FuentesApropiacion.activo = true;
      this.fuentesApropiacionModel.validate(FuentesApropiacion);
      return FuentesApropiacion.save();
    } catch (error) {
      return error;
    }
  }

  async getAll(filterDto: FilterDto): Promise<FuentesApropiacion[]> {
    const filtersService = new FiltersService(filterDto);
    return await this.fuentesApropiacionModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
      .sort(filtersService.getSortBy())
      .exec();
  }

  async getById(id: string): Promise<FuentesApropiacion> {
    try {
      return await this.fuentesApropiacionModel.findById(id).exec();
    } catch (error) {
      return null;
    };

  }

  async put(id: string, PeriodoSeguimientoDto: FuentesApropiacionDto): Promise<FuentesApropiacion> {
    try {
      PeriodoSeguimientoDto.fecha_modificacion = new Date();
      await this.fuentesApropiacionModel.validate(PeriodoSeguimientoDto);
      await this.fuentesApropiacionModel.findByIdAndUpdate(id, PeriodoSeguimientoDto, { new: true }).exec();
      return await this.fuentesApropiacionModel.findById(id).exec();
    } catch (error) {
      return error;
    }

  }

  async delete(id: string): Promise<any> {
    try {
      return await this.fuentesApropiacionModel.findByIdAndRemove(id).exec();
    } catch (error) {
      return null;
    }

  }
}
