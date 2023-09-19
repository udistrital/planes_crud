import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IdentificacionDetalle } from './schema/identificacion-detalle.schema';
import { Model } from 'mongoose';
import { IdentificacionDetalleDto } from './dto/identificacion-detalle.dto';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { FiltersService } from 'src/filters/filters.service';

@Injectable()
export class IdentificacionDetalleService {
    constructor (
        @InjectModel(IdentificacionDetalle.name)
        private readonly identificacionDetalleModel: Model<IdentificacionDetalle>
    ) {}

    async post(identificacionDetalleDto: IdentificacionDetalleDto): Promise<IdentificacionDetalle> {
        try {
            const identificacionDetalle = new this.identificacionDetalleModel(identificacionDetalleDto);
            identificacionDetalle.fecha_creacion = new Date();
            identificacionDetalle.fecha_modificacion = new Date();
            identificacionDetalle.activo = true;
            this.identificacionDetalleModel.validate(identificacionDetalle);
            return identificacionDetalle.save();
        } catch (error) {
            return error;
        }
    }

    async getAll(filterDto: FilterDto): Promise<IdentificacionDetalle[]> {
        const filtersService = new FiltersService(filterDto);
        return await this.identificacionDetalleModel.find(
            filtersService.getQuery(),
            filtersService.getFields(),
            filtersService.getLimitAndOffset()
        ).sort(filtersService.getSortBy()).exec();
    }

    async getById(id: string): Promise<IdentificacionDetalle> {
        try {
            return await this.identificacionDetalleModel.findById(id).exec();
        } catch (error) {
            return null;
        }
    }

    async put(id: string, identificacionDetalleDto: IdentificacionDetalleDto): Promise<IdentificacionDetalle> {
        try {
            identificacionDetalleDto.fecha_modificacion = new Date();
            await this.identificacionDetalleModel.validate(identificacionDetalleDto);
            await this.identificacionDetalleModel.findByIdAndUpdate(id, identificacionDetalleDto, {new: true}).exec();
            return await this.identificacionDetalleModel.findById(id).exec();
        } catch (error) {
            return error;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return await this.identificacionDetalleModel.findByIdAndRemove(id).exec();
        } catch (error) {
            return null;
        }
    }
}
