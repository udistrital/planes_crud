import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { TipoIdentificacion } from "./schemas/tipo-identificacion.schema";
import { TipoIdentificacionDto } from "./dto/tipo-identificacion.dto";

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class TipoIdentificacionService {

    constructor(@InjectModel(TipoIdentificacion.name) private readonly tipoModel: Model<TipoIdentificacion>) {

    }

    async post(tipoDto: TipoIdentificacionDto): Promise<TipoIdentificacion> {
        try {
            const tipoIdentificacion = new this.tipoModel(tipoDto);
            tipoIdentificacion.fecha_creacion = new Date();
            tipoIdentificacion.fecha_modificacion = new Date();
            tipoIdentificacion.activo = true;
            await this.tipoModel.validate(tipoIdentificacion);
            return tipoIdentificacion.save();
        } catch (error) {
            return error;
        }
    }

    async getAll(filterDto: FilterDto): Promise<TipoIdentificacion[]> {
        const filtersService = new FiltersService(filterDto);
        return await this.tipoModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
            .sort(filtersService.getSortBy())
            .exec();
    }

    async getById(id: string): Promise<TipoIdentificacion> {
        try {
            return await this.tipoModel.findById(id).exec();
        } catch (error) {
            return null;
        };

    }

    async put(id: string, tipoDto: TipoIdentificacionDto): Promise<TipoIdentificacion> {
        try {
            tipoDto.fecha_modificacion = new Date();
            await this.tipoModel.validate(tipoDto);
            await this.tipoModel.findByIdAndUpdate(id, tipoDto, { new: true }).exec();
            return await this.tipoModel.findById(id).exec();
        } catch (error) {
            return error;
        }

    }

    async delete(id: string): Promise<any> {
        try {
            return await this.tipoModel.findByIdAndRemove(id).exec();
        } catch (error) {
            return null;
        }
    }
}
