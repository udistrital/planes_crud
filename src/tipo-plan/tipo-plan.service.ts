import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { TipoPlanDto } from "./dto/tipo-plan.dto";
import { TipoPlan } from "./schemas/tipo-plan.schema";

@Injectable()
export class TipoPlanService {


    constructor(@InjectModel(TipoPlan.name) private readonly tipoPlanModel: Model<TipoPlan>){

    }

    async post(planDto: TipoPlanDto): Promise<TipoPlan> {
        const plan = new this.tipoPlanModel(planDto);
        plan.fecha_creacion = new Date();
        plan.fecha_modificacion = new Date();
        return  plan.save();
    }
    
    async getAll(): Promise<TipoPlan[]>{
        return await this.tipoPlanModel.find()
    }

    async getById(id: string): Promise<TipoPlan>{
        try{
            return await this.tipoPlanModel.findById(id).exec();
        }catch(error){
            return null;
        };
        
    }

    async put(id: string, tipoPlanDto: TipoPlanDto): Promise<TipoPlan>{
        try{
            tipoPlanDto.fecha_modificacion = new Date();
            await this.tipoPlanModel.findByIdAndUpdate(id, tipoPlanDto, {new: true}).exec();
            return await this.tipoPlanModel.findById(id).exec();
        }catch(error){
            return null;
        }
        
    }

    async delete(id: string): Promise<any>{
        try{
            return await this.tipoPlanModel.findByIdAndRemove(id).exec();
        }catch(error){
            return null;
        }

    }

}
