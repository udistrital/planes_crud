import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Plan } from "./schemas/plan.schema";
import { PlanDto } from "./dto/plan.dto";

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class PlanService {

    constructor(@InjectModel(Plan.name) private readonly planModel: Model<Plan>){

    }

    async post(planDto: PlanDto): Promise<Plan> {
        const plan = new this.planModel(planDto);
        plan.fecha_creacion = new Date();
        plan.fecha_modificacion = new Date();
        return  plan.save();
    }
    
    async getAll(filterDto: FilterDto): Promise<Plan[]>{
        const filtersService = new FiltersService(filterDto);
        return await this.planModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
        .sort(filtersService.getSortBy())
        .exec();
    }

    async getById(id: string): Promise<Plan>{
        try{
            return await this.planModel.findById(id).exec();
        }catch(error){
            return null;
        };
        
    }

    async put(id: string, planDto: PlanDto): Promise<Plan>{
        try{
            planDto.fecha_modificacion = new Date();
            await this.planModel.findByIdAndUpdate(id, planDto , {new: true}).exec();
            return await this.planModel.findById(id).exec();
        }catch(error){
            return null;
        }
        
    }

    async delete(id: string): Promise<any>{
        try{
            return await this.planModel.findByIdAndRemove(id).exec();
        }catch(error){
            return null;
        }

    }




}
