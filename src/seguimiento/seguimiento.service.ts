import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';
import { Seguimiento } from './schemas/seguimiento.schema';
import { SeguimientoDto } from './dto/seguimiento.dto';

@Injectable()
export class SeguimientoService {



    constructor(@InjectModel(Seguimiento.name) private readonly seguimientoModel: Model<Seguimiento>) {

    }

    async post(seguimientoDto: SeguimientoDto): Promise<Seguimiento> {
        try {
            const seguimiento = new this.seguimientoModel(seguimientoDto);
            seguimiento.fecha_creacion = new Date();
            seguimiento.fecha_modificacion = new Date();
            seguimiento.activo = true;
            this.seguimientoModel.validate(seguimiento);
            return seguimiento.save();
        } catch (error) {
            return error
        }

    }

    async getAll(filterDto: FilterDto): Promise<Seguimiento[]> {
        const filtersService = new FiltersService(filterDto);
        return await this.seguimientoModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
            .sort(filtersService.getSortBy())
            .exec();
    }

    async getById(id: string): Promise<Seguimiento> {
        try {
            return await this.seguimientoModel.findById(id).exec();
        } catch (error) {
            return null;
        };

    }

    async put(id: string, seguimientoDto: SeguimientoDto): Promise<Seguimiento> {
        try {
            seguimientoDto.fecha_modificacion = new Date();
            await this.seguimientoModel.validate(seguimientoDto);
            await this.seguimientoModel.findByIdAndUpdate(id, seguimientoDto, { new: true }).exec();
            return await this.seguimientoModel.findById(id).exec();
        } catch (error) {
            return error;
        }

    }

    async delete(id: string): Promise<any> {
        try {
            return await this.seguimientoModel.findByIdAndRemove(id).exec();
        } catch (error) {
            return null;
        }

    }
}
