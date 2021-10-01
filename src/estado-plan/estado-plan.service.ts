import { Injectable } from '@nestjs/common';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { EstadoPlanDto } from "./dto/estado-plan.dto";
import { EstadoPlan } from "./schemas/estado-plan.schema";

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class EstadoPlanService {

    constructor(@InjectModel(EstadoPlan.name) private readonly estadoPlanModel: Model<EstadoPlan>){

    }

    async post(planDto: EstadoPlanDto): Promise<EstadoPlan> {
        const plan = new this.estadoPlanModel(planDto);
        plan.fecha_creacion = new Date();
        plan.fecha_modificacion = new Date();
        return  plan.save();
    }

    async getAll(filterDto: FilterDto): Promise<EstadoPlan[]>{
        const filtersService = new FiltersService(filterDto);
        return await this.estadoPlanModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
        .sort(filtersService.getSortBy())
        .exec();
    }

    async getById(id: string): Promise<EstadoPlan>{
        try{
            return await this.estadoPlanModel.findById(id).exec();
        }catch(error){
            return null;
        };
        
    }

    async put(id: string, estadoPlanDto: EstadoPlanDto): Promise<EstadoPlan>{
        try{
            estadoPlanDto.fecha_modificacion = new Date();
            await this.estadoPlanModel.findByIdAndUpdate(id, estadoPlanDto, {new: true}).exec();
            return await this.estadoPlanModel.findById(id).exec();
        }catch(error){
            return null;
        }
        
    }

    async delete(id: string): Promise<any>{
        try{
            return await this.estadoPlanModel.findByIdAndRemove(id).exec();
        }catch(error){
            return null;
        }

    }

}
