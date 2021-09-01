import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { SubgrupoDetalleDto } from "./dto/subgrupo-detalle.dto";
import { SubgrupoDetalle, SubgrupoDetalleSchema } from "./schemas/subgrupo-detalle.schema";

@Injectable()
export class SubgrupoDetalleService {

    constructor(@InjectModel(SubgrupoDetalle.name) private readonly subgrupoDetalleModel : Model<SubgrupoDetalle>){

    }

    async post(subgrupoDetalleDto: SubgrupoDetalleDto): Promise<SubgrupoDetalle> {
        const subgrupoDetalle = new this.subgrupoDetalleModel(subgrupoDetalleDto);
        subgrupoDetalle.fecha_creacion = new Date();
        subgrupoDetalle.fecha_modificacion = new Date();
        return  subgrupoDetalle.save();
    }
    
    async getAll(): Promise<SubgrupoDetalle[]>{
        return await this.subgrupoDetalleModel.find()
    }

    async getById(id: string): Promise<SubgrupoDetalle>{
        try{
            return await this.subgrupoDetalleModel.findById(id).exec();
        }catch(error){
            return null;
        };
        
    }

    async detalle(filtro : string): Promise<SubgrupoDetalle[]>{

        try{
            return await this.subgrupoDetalleModel.find({subgrupo_id: filtro}).exec();
        }catch(error){
            return null;
        }
    }

    async put(id: string, subgrupoDetalleDto: SubgrupoDetalleDto): Promise<SubgrupoDetalle>{
        try{
            subgrupoDetalleDto.fecha_modificacion = new Date();
            await this.subgrupoDetalleModel.findByIdAndUpdate(id, subgrupoDetalleDto , {new: true}).exec();
            return await this.subgrupoDetalleModel.findById(id).exec();
        }catch(error){
            return null;
        }
        
    }

    async delete(id: string): Promise<any>{
        try{
            return await this.subgrupoDetalleModel.findByIdAndRemove(id).exec();
        }catch(error){
            return null;
        }

    }


}
