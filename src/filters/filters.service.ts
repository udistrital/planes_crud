import { ParseBoolPipe } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';

export class FiltersService {
    constructor(private readonly filterDto: FilterDto) { }

    getQuery(): Object {
        //Filtro de consulta campo:valor (selección)
        let queryObj = {};
        if (this.filterDto.query) {
        let queryProperties = this.filterDto.query.split(',');
        queryProperties.forEach(function (property) {
            let tup = property.split(/:(.+)/);
            queryObj[tup[0]] = tup[1];
        });
        }
        return queryObj;
    }

    getFields(): Object {
        //Filtro de consulta por campo (proyección)
        let fieldsObj = {};
        if (this.filterDto.fields) {
        let fieldsProperties = this.filterDto.fields.split(',');
        fieldsProperties.forEach(function (property) {
            fieldsObj[property] = 1;
        });
        }
        return fieldsObj
    }

    getSortBy(): any[]{
        //Filtro de ordenamiento
        let sortbyArray = [];
        if (this.filterDto.sortby) {
        let sortbyProperties = this.filterDto.sortby.split(',');
        if (this.filterDto.order) {
            let orderProperties = this.filterDto.order.split(',');
            if (orderProperties.length == 1) {//Si order solo contiene un valor ordena todos los campos de acuerdo al mismo
            let orderTerm = (this.filterDto.order == 'desc') ? -1 : 1;
            sortbyProperties.forEach(function (property) {
                sortbyArray.push([property, orderTerm]);
            });
            } else if (sortbyProperties.length == orderProperties.length) {//Si order y sortby tienen el mismo tamaño, se ordena cada campo de acuerdo al orden específico
            for (let i = 0; i < sortbyProperties.length; i++) {
                sortbyArray.push([sortbyProperties[i], (orderProperties[i] == 'desc' ? -1 : 1)]);
            }
            } else {//Si order y sortby tienen tamaños diferentes, se ignora el orden definido y se ordena de forma ascendente
            sortbyProperties.forEach(function (property) {
                sortbyArray.push([property, 1]);
            });
            }
        } else {//Si order no está definido, por defecto todos los campos son ordenados ascendentemente
            sortbyProperties.forEach(function (property) {
            sortbyArray.push([property, 1]);
            });
        }
        }
        return sortbyArray;
    }

    getLimitAndOffset(): Object{            
        return { skip: parseInt(this.filterDto.offset), limit: parseInt(this.filterDto.limit) };
    }

    isPopulated(): boolean{            
        return this.filterDto.populate === 'true';
    }

}
