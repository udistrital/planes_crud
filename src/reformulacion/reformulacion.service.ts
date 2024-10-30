import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reformulacion } from './schemas/reformulacion.schema';
import { Model } from 'mongoose';
import { ReformulacionDto } from './dto/reformulacion.dto';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { FiltersService } from 'src/filters/filters.service';

@Injectable()
export class ReformulacionService {
  constructor(
    @InjectModel(Reformulacion.name)
    private readonly reformulacionModel: Model<Reformulacion>,
  ) {}

  async post(reformulacionDto: ReformulacionDto): Promise<Reformulacion> {
    try {
      const reformulacion = new this.reformulacionModel(reformulacionDto);
      reformulacion.fecha_creacion = new Date();
      reformulacion.fecha_modificacion = new Date();
      reformulacion.activo = true;
      await this.reformulacionModel.validate(reformulacion);
      return reformulacion.save();
    } catch (error) {
      return error;
    }
  }

  async getAll(filterDto: FilterDto): Promise<Reformulacion[]> {
    const filtersService = new FiltersService(filterDto);
    return await this.reformulacionModel
      .find(
        filtersService.getQuery(),
        filtersService.getFields(),
        filtersService.getLimitAndOffset(),
      )
      .sort(filtersService.getSortBy())
      .exec();
  }

  async getById(id: string): Promise<Reformulacion> {
    try {
      return await this.reformulacionModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  }

  async put(id: string, planDto: ReformulacionDto): Promise<Reformulacion> {
    try {
      planDto.fecha_modificacion = new Date();
      await this.reformulacionModel.validate(planDto);
      await this.reformulacionModel
        .findByIdAndUpdate(id, planDto, { new: true })
        .exec();
      return await this.reformulacionModel.findById(id).exec();
    } catch (error) {
      return error;
    }
  }

  async delete(id: string): Promise<Reformulacion> {
    try {
      return await this.reformulacionModel.findByIdAndRemove(id).exec();
    } catch (error) {
      return null;
    }
  }
}
