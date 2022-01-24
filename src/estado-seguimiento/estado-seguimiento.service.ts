import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EstadoSeguimientoDto } from './dto/estado-seguimiento.dto';
import { EstadoSeguimiento } from './schemas/estado-seguimiento.schema';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { FiltersService } from 'src/filters/filters.service';


@Injectable()
export class EstadoSeguimientoService {
    constructor(@InjectModel(EstadoSeguimiento.name) private readonly estadoSeguimientoModel: Model<EstadoSeguimiento>){

    }

    async post(estadoSeguimientoDto: EstadoSeguimientoDto): Promise<EstadoSeguimiento> {
        const estadoSeguimiento = new this.estadoSeguimientoModel(estadoSeguimientoDto);
        estadoSeguimiento.fecha_creacion = new Date();
        estadoSeguimiento.fecha_modificacion = new Date();
        return  estadoSeguimiento.save();
    }

    async getAll(filterDto: FilterDto): Promise<EstadoSeguimiento[]>{
        const filtersService = new FiltersService(filterDto);
        return await this.estadoSeguimientoModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
        .sort(filtersService.getSortBy())
        .exec();
    }

    async getById(id: string): Promise<EstadoSeguimiento>{
        try{
            return await this.estadoSeguimientoModel.findById(id).exec();
        }catch(error){
            return null;
        };
        
    }

    async put(id: string, estadoSeguimientoDto: EstadoSeguimientoDto): Promise<EstadoSeguimiento>{
        try{
            estadoSeguimientoDto.fecha_modificacion = new Date();
            await this.estadoSeguimientoModel.findByIdAndUpdate(id, estadoSeguimientoDto, {new: true}).exec();
            return await this.estadoSeguimientoModel.findById(id).exec();
        }catch(error){
            return null;
        }
        
    }

    async delete(id: string): Promise<any>{
        try{
            return await this.estadoSeguimientoModel.findByIdAndRemove(id).exec();
        }catch(error){
            return null;
        }

    }

}
