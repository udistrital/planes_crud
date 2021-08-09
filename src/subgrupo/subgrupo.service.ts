import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { SubgrupoDto } from "./dto/subgrupo.dto";
import { Subgrupo, SubgrupoSchema } from "./schemas/subgrupo.schema";

@Injectable()
export class SubgrupoService {

    constructor(@InjectModel(Subgrupo.name) private readonly subgrupoModel : Model<Subgrupo>){

    }

    async post(subgrupoDto: SubgrupoDto): Promise<Subgrupo> {
        const subgrupo = new this.subgrupoModel(subgrupoDto);
        subgrupo.fecha_creacion = new Date();
        subgrupo.fecha_modificacion = new Date();
        return  subgrupo.save();
    }
    
    async getAll(): Promise<Subgrupo[]>{
        return await this.subgrupoModel.find()
    }

    async getById(id: string): Promise<Subgrupo>{
        try{
            return await this.subgrupoModel.findById(id).exec();
        }catch(error){
            return null;
        };
        
    }

    async put(id: string, subgrupoDto: SubgrupoDto): Promise<Subgrupo>{
        try{
            subgrupoDto.fecha_modificacion = new Date();
            await this.subgrupoModel.findByIdAndUpdate(id, subgrupoDto , {new: true}).exec();
            return await this.subgrupoModel.findById(id).exec();
        }catch(error){
            return null;
        }
        
    }

    async delete(id: string): Promise<any>{
        try{
            return await this.subgrupoModel.findByIdAndRemove(id).exec();
        }catch(error){
            return null;
        }

    }




}
