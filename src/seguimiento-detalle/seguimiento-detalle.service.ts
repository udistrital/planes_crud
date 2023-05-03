import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';
import { SeguimientoDetalle } from './schemas/seguimiento-detalle.schema';
import { SeguimientoDetalleDto } from './dto/seguimiento-detalle.dto';

@Injectable()
export class SeguimientoDetalleService {



    constructor(@InjectModel(SeguimientoDetalle.name) private readonly seguimientoDetalleModel: Model<SeguimientoDetalle>) {

    }

    async post(seguimientoDetalleDto: SeguimientoDetalleDto): Promise<SeguimientoDetalle> {
        try {
            const seguimientoDetalle = new this.seguimientoDetalleModel(seguimientoDetalleDto);
            seguimientoDetalle.fecha_creacion = new Date();
            seguimientoDetalle.fecha_modificacion = new Date();
            seguimientoDetalle.activo = true;
            this.seguimientoDetalleModel.validate(seguimientoDetalle);
            return seguimientoDetalle.save();
        } catch (error) {
            return error
        }

    }

    async getAll(filterDto: FilterDto): Promise<SeguimientoDetalle[]> {
        const filtersService = new FiltersService(filterDto);
        return await this.seguimientoDetalleModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
            .sort(filtersService.getSortBy())
            .exec();
    }

    async getById(id: string): Promise<SeguimientoDetalle> {
        try {
            return await this.seguimientoDetalleModel.findById(id).exec();
        } catch (error) {
            return null;
        };

    }

    async put(id: string, seguimientoDetalleDto: SeguimientoDetalleDto): Promise<SeguimientoDetalle> {
        try {
            seguimientoDetalleDto.fecha_modificacion = new Date();
            await this.seguimientoDetalleModel.validate(seguimientoDetalleDto);
            await this.seguimientoDetalleModel.findByIdAndUpdate(id, seguimientoDetalleDto, { new: true }).exec();
            return await this.seguimientoDetalleModel.findById(id).exec();
        } catch (error) {
            return error;
        }

    }

    async delete(id: string): Promise<any> {
        try {
            return await this.seguimientoDetalleModel.findByIdAndRemove(id).exec();
        } catch (error) {
            return null;
        }

    }
}
