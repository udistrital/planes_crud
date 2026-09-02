import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { SubgrupoDto } from "./dto/subgrupo.dto";
import { Subgrupo, SubgrupoSchema } from "./schemas/subgrupo.schema";
import { query } from 'express';

import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';

export class SubgrupoOrderError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
        this.name = 'SubgrupoOrderError';
    }
}

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
            return await this.subgrupoModel.findByIdAndDelete(id).exec();
        } catch (error) {
            return null;
        }

    }

    async hijos(filtro: string): Promise<Subgrupo[]> {

        try {
            const hijos = await this.subgrupoModel.find({ padre: filtro })
                .sort({ fecha_creacion: 1, _id: 1 })
                .exec();
            const padre = await this.subgrupoModel.findById(filtro).select('hijos').lean().exec();

            // Los hijos directos de un plan se conservan por fecha. Para los
            // demás niveles, el arreglo hijos del subgrupo padre es la fuente
            // de verdad del orden.
            if (!padre || !Array.isArray(padre.hijos)) {
                return hijos;
            }

            const posicion = new Map(
                padre.hijos.map((id, index) => [id.toString(), index]),
            );
            return hijos.sort((a, b) => {
                const posicionA = posicion.get(a._id.toString());
                const posicionB = posicion.get(b._id.toString());
                if (posicionA !== undefined && posicionB !== undefined) {
                    return posicionA - posicionB;
                }
                if (posicionA !== undefined) return -1;
                if (posicionB !== undefined) return 1;
                const fechaA = a.fecha_creacion ? new Date(a.fecha_creacion).getTime() : 0;
                const fechaB = b.fecha_creacion ? new Date(b.fecha_creacion).getTime() : 0;
                return fechaA - fechaB || a._id.toString().localeCompare(b._id.toString());
            });
        } catch (error) {
            return error;
        }
    }

    async reorderChildren(id: string, hijos: string[]): Promise<Subgrupo> {
        if (!Array.isArray(hijos) || hijos.length === 0) {
            throw new SubgrupoOrderError(400, 'La lista de hijos es obligatoria y no puede estar vacía');
        }

        const normalizados = hijos.map(hijo => String(hijo));
        if (new Set(normalizados).size !== normalizados.length) {
            throw new SubgrupoOrderError(400, 'La lista de hijos contiene identificadores repetidos');
        }

        const padre = await this.subgrupoModel.findById(id).exec();
        if (!padre) {
            throw new SubgrupoOrderError(404, 'Subgrupo padre no encontrado');
        }

        const hermanos = await this.subgrupoModel.find({ padre: id }).select('_id').lean().exec();
        const idsHermanos = hermanos.map(hermano => hermano._id.toString());
        const conjuntoHermanos = new Set(idsHermanos);

        if (normalizados.some(hijo => !conjuntoHermanos.has(hijo))) {
            throw new SubgrupoOrderError(409, 'Uno o más nodos no pertenecen al padre recibido');
        }
        if (normalizados.length !== idsHermanos.length) {
            throw new SubgrupoOrderError(400, 'Se debe enviar la colección completa de hijos del padre');
        }

        const hijosAnteriores = Array.isArray(padre.hijos)
            ? padre.hijos.map(hijo => hijo.toString())
            : undefined;
        const filtroActualizacion: any = { _id: id };
        if (hijosAnteriores === undefined) {
            filtroActualizacion.hijos = { $exists: false };
        } else {
            filtroActualizacion.hijos = hijosAnteriores;
        }

        const actualizado = await this.subgrupoModel.findOneAndUpdate(
            filtroActualizacion,
            {
                $set: {
                    hijos: normalizados,
                    fecha_modificacion: new Date(),
                },
            },
            { new: true },
        ).exec();

        if (!actualizado) {
            throw new SubgrupoOrderError(409, 'El orden fue modificado concurrentemente');
        }
        return actualizado;
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
