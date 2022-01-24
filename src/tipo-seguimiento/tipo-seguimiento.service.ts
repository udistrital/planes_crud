import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';
import { TipoSeguimiento } from './schemas/tipo-seguimiento.schema';
import { TipoSeguimientoDto } from './dto/tipo-seguimiento.dto';


@Injectable()
export class TipoSeguimientoService {


    constructor(@InjectModel(TipoSeguimiento.name) private readonly tipoSeguimientoModel: Model<TipoSeguimiento>){

    }

    async post(tipoSeguimientoDto: TipoSeguimientoDto): Promise<TipoSeguimiento> {
        const tipoSeguimiento = new this.tipoSeguimientoModel(tipoSeguimientoDto);
        tipoSeguimiento.fecha_creacion = new Date();
        tipoSeguimiento.fecha_modificacion = new Date();
        return tipoSeguimiento.save();
    }
    
    async getAll(filterDto: FilterDto): Promise<TipoSeguimiento[]>{
        const filtersService = new FiltersService(filterDto);
        return await this.tipoSeguimientoModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
        .sort(filtersService.getSortBy())
        .exec();
    }

    async getById(id: string): Promise<TipoSeguimiento>{
        try{
            return await this.tipoSeguimientoModel.findById(id).exec();
        }catch(error){
            return null;
        };
        
    }

    async put(id: string, tipoDto: TipoSeguimientoDto): Promise<TipoSeguimiento>{
        try{
            tipoDto.fecha_modificacion = new Date();
            await this.tipoSeguimientoModel.findByIdAndUpdate(id, tipoDto , {new: true}).exec();
            return await this.tipoSeguimientoModel.findById(id).exec();
        }catch(error){
            return null;
        }
        
    }

    async delete(id: string): Promise<any>{
        try{
            return await this.tipoSeguimientoModel.findByIdAndRemove(id).exec();
        }catch(error){
            return null;
        }
    }

}
