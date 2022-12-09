import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { TipoPlanDto } from "./dto/tipo-plan.dto";
import { TipoPlan } from "./schemas/tipo-plan.schema";

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class TipoPlanService {


    constructor(@InjectModel(TipoPlan.name) private readonly tipoPlanModel: Model<TipoPlan>) {

    }

    async post(planDto: TipoPlanDto): Promise<TipoPlan> {
        try {
            const plan = new this.tipoPlanModel(planDto);
            plan.fecha_creacion = new Date();
            plan.fecha_modificacion = new Date();
            plan.activo = true;
            await this.tipoPlanModel.validate(plan);
            return plan.save();
        } catch (error) {
            return error;
        }
    }

    async getAll(filterDto: FilterDto): Promise<TipoPlan[]> {
        const filtersService = new FiltersService(filterDto);
        return await this.tipoPlanModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
            .sort(filtersService.getSortBy())
            .exec();
    }

    async getById(id: string): Promise<TipoPlan> {
        try {
            return await this.tipoPlanModel.findById(id).exec();
        } catch (error) {
            return null;
        };

    }

    async put(id: string, tipoPlanDto: TipoPlanDto): Promise<TipoPlan> {
        try {
            tipoPlanDto.fecha_modificacion = new Date();
            await this.tipoPlanModel.validate(tipoPlanDto);
            await this.tipoPlanModel.findByIdAndUpdate(id, tipoPlanDto, { new: true }).exec();
            return await this.tipoPlanModel.findById(id).exec();
        } catch (error) {
            return error;
        }

    }

    async delete(id: string): Promise<any> {
        try {
            return await this.tipoPlanModel.findByIdAndRemove(id).exec();
        } catch (error) {
            return null;
        }

    }

}
