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

  async buscarRegistrosPorUnidadInteres(unidadId: string) {
    try {
      const registrosEncontrados = await this.periodoSeguimientoModel.find({
        unidades_interes: new RegExp(`.*"Id":${unidadId}.*`),
        activo: true,
        planes_interes: { $exists: true, $ne: null},
      }).exec();
      return registrosEncontrados;
    } catch (error) {
      return null;
    }
  }

  async obtenerRegistrosExistencia(data: PeriodoSeguimientoDto, caso: number): Promise<any[]> {
    const unidades_interes = JSON.parse(data.unidades_interes)
    const unidades = unidades_interes.map((unidad) => JSON.stringify(unidad));
    var condiciones: any = {
      periodo_id: data.periodo_id,
      tipo_seguimiento_id: data.tipo_seguimiento_id,
      activo: true,
    };
    if(data.planes_interes) {
      var planes_interes = JSON.parse(data.planes_interes)
      var plan = planes_interes[0];
    }
    
    var registros;
    if(caso === 1) { // Busca el registro por periodo y unidades
      condiciones.unidades_interes = { $in: unidades.map((u) => new RegExp(u, 'i')) }; // Utilizando expresiones regulares para la comparación
      condiciones.planes_interes = { $regex: new RegExp(`"${plan._id}"`), $options: 'i' };     // Esto hace la búsqueda más flexible y no sensible a mayúsculas/minúsculas
      registros = await this.periodoSeguimientoModel.find(condiciones).exec();
    } else if(caso === 2) { // Busca el registro por periodo, fecha_inicio y fecha_fin
      condiciones.planes_interes = { $regex: new RegExp(`"${plan._id}"`), $options: 'i' };     // Esto hace la búsqueda más flexible y no sensible a mayúsculas/minúsculas
      condiciones.fecha_inicio = data.fecha_inicio;
      condiciones.fecha_fin = data.fecha_fin;
      registros = await this.periodoSeguimientoModel.find(condiciones).exec();
    } else if (caso === 3 ) { // Busca el registro que permita la formulación de un plan para una unidad específica
      condiciones.unidades_interes = { $in: unidades.map((u) => new RegExp(u, 'i')) }; // Utilizando expresiones regulares para la comparación
      if (plan) {
        console.log("Plan: ", plan);
        condiciones.planes_interes = { $regex: new RegExp(`"${plan._id}"`), $options: 'i' };
      }
      registros = await this.periodoSeguimientoModel.find(condiciones).exec();
    }
    
    return registros.length > 0 ? registros : null;
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
