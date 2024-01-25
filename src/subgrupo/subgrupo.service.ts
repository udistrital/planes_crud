import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { SubgrupoDto } from "./dto/subgrupo.dto";
import { Subgrupo, SubgrupoSchema } from "./schemas/subgrupo.schema";
import { query } from 'express';

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

@Injectable()
export class SubgrupoService {

    constructor(@InjectModel(Subgrupo.name) private readonly subgrupoModel: Model<Subgrupo>) {

    }

    async post(subgrupoDto: SubgrupoDto): Promise<Subgrupo> {
        try {
            const subgrupo = new this.subgrupoModel(subgrupoDto);
            subgrupo.fecha_creacion = new Date();
            subgrupo.fecha_modificacion = new Date();
            await this.subgrupoModel.validate(subgrupo);
            return subgrupo.save();
        } catch (error) {
            return error;
        }
    }

    async getAll(filterDto: FilterDto): Promise<Subgrupo[]> {
        const filtersService = new FiltersService(filterDto);
        return await this.subgrupoModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
            .sort(filtersService.getSortBy())
            .exec();
    }

    async getById(id: string): Promise<SubgrupoDto> {
        try {
            return await this.subgrupoModel.findById(id).exec();
        } catch (error) {
            return null;
        };

    }

    async put(id: string, subgrupoDto: SubgrupoDto): Promise<Subgrupo> {
        try {
            subgrupoDto.fecha_modificacion = new Date();
            await this.subgrupoModel.validate(subgrupoDto);
            await this.subgrupoModel.findByIdAndUpdate(id, subgrupoDto, { new: true }).exec();
            return await this.subgrupoModel.findById(id).exec();
        } catch (error) {
            return error;
        }

    }

    async delete(id: string): Promise<any> {
        try {
            return await this.subgrupoModel.findByIdAndRemove(id).exec();
        } catch (error) {
            return null;
        }

    }

    async hijos(filtro: string): Promise<Subgrupo[]> {

        try {
            return await this.subgrupoModel.find({ padre: filtro }).exec();
        } catch (error) {
            return error;
        }
    }

    async deleteNodo(subgrupoDto: SubgrupoDto) {
        try {
            subgrupoDto.activo = false
            const nodo = await this.subgrupoModel.findByIdAndUpdate(subgrupoDto._id, subgrupoDto, { new: true }).exec()
            if (subgrupoDto.hijos.length > 0) {
                for (var i = 0; i < subgrupoDto.hijos.length; i++) {
                    var hijos = subgrupoDto.hijos
                    const hijo = await this.getById(hijos[i])
                    const res2 = await this.deleteNodo(hijo)
                }
            }
            return nodo
        } catch (error) {
            return error;
        }
    }




}
