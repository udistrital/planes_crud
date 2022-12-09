import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Identificacion } from "./schemas/identificacion.schema";
import { IdentificacionDto } from "./dto/identificacion.dto";

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class IdentificacionService {

    constructor(@InjectModel(Identificacion.name) private readonly identificacionModel: Model<Identificacion>) {

    }

    async post(IdentificacionDto: IdentificacionDto): Promise<Identificacion> {
        try {
            const identi = new this.identificacionModel(IdentificacionDto);
            identi.fecha_creacion = new Date();
            identi.fecha_modificacion = new Date();
            identi.activo = true;
            this.identificacionModel.validate(identi);
            return identi.save();
        } catch (error) {
            return error;
        }

    }

    async getAll(filterDto: FilterDto): Promise<Identificacion[]> {
        const filtersService = new FiltersService(filterDto);
        return await this.identificacionModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
            .sort(filtersService.getSortBy())
            .exec();
    }

    async getById(id: string): Promise<Identificacion> {
        try {
            return await this.identificacionModel.findById(id).exec();
        } catch (error) {
            return null;
        };

    }

    async put(id: string, identiDto: IdentificacionDto): Promise<Identificacion> {
        try {
            identiDto.fecha_modificacion = new Date();
            await this.identificacionModel.validate(identiDto);
            await this.identificacionModel.findByIdAndUpdate(id, identiDto, { new: true }).exec();
            return await this.identificacionModel.findById(id).exec();
        } catch (error) {
            return error;
        }

    }

    async delete(id: string): Promise<any> {
        try {
            return await this.identificacionModel.findByIdAndRemove(id).exec();
        } catch (error) {
            return null;
        }

    }

}
