import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';

import { SubgrupoDto } from "./dto/subgrupo.dto";
import { SubgrupoService } from "./subgrupo.service";
import { PlanService } from "../plan/plan.service";
import { FilterDto } from '../filters/dto/filter.dto';

@Controller('subgrupo')
export class SubgrupoController {

    constructor(private subgrupoService: SubgrupoService, private planService: PlanService) { }

    @Post()
    async post(@Res() res, @Body() subgrupoDto: SubgrupoDto) {
        const subgrupo = await this.subgrupoService.post(subgrupoDto);
        if (subgrupo instanceof Error) {
            return res.status(HttpStatus.OK).json({
                Data: null,
                Message: subgrupo.message,
                Status: "400",
                Success: false
            });
        } else {
            return res.status(HttpStatus.OK).json({
                Data: subgrupo,
                Message: "Registration successfull",
                Status: "201",
                Success: true
            });
        }
    }

    @Post('/registrar_nodo')
    async postNodo(@Res() res, @Body() subgrupoDto: SubgrupoDto) {
        const subgrupo = await this.subgrupoService.post(subgrupoDto);
        const plan = await this.planService.getById(subgrupoDto.padre)
        if (plan == null) {
            var padreSubgrupo = await this.subgrupoService.getById(subgrupoDto.padre)
            await padreSubgrupo.hijos.push(subgrupo._id)
            const padreActualizado = await this.subgrupoService.put(subgrupoDto.padre, padreSubgrupo);
            if (padreActualizado instanceof Error) {
                return res.status(HttpStatus.OK).json({
                    Data: null,
                    Message: padreActualizado.message,
                    Status: "400",
                    Success: false
                });
            }
        }

        if (subgrupo instanceof Error) {
            return res.status(HttpStatus.OK).json({
                Data: null,
                Message: subgrupo.message,
                Status: "400",
                Success: false
            });
        } else {
            return res.status(HttpStatus.OK).json({
                Data: subgrupo,
                Message: "Registration successfull",
                Status: "201",
                Success: true
            });
        }
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto) {
        const subgrupo = await this.subgrupoService.getAll(filterDto);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupo,
                Message: "Request succesfull",
                Status: "200",
                Success: true
            });
    }

    @Get('/:id')
    async get(@Res() res, @Param('id') id: string) {

        const subgrupo = await this.subgrupoService.getById(id);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupo ? subgrupo : null,
                Message: "Request succesfull",
                Status: "200",
                Success: true
            });
    }

    @Get('/hijos/:id')
    async getHijos(@Res() res, @Param('id') id: string) {

        const subgrupo = await this.subgrupoService.hijos(id);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupo ? subgrupo : null,
                Message: "Request succesfull",
                Status: "200",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id: string, @Body() subgrupoDto: SubgrupoDto) {

        const subgrupo = await this.subgrupoService.put(id, subgrupoDto);
        //if (!subgrupo) throw new NotFoundException("not found resource");
        if (subgrupo instanceof Error) {
            return res.status(HttpStatus.OK).json({
                Data: null,
                Message: subgrupo.message,
                Status: "400",
                Success: false
            });
        } else {
            return res.status(HttpStatus.OK).json({
                Data: subgrupo,
                Message: "Update successfull",
                Status: "200",
                Success: true
            });
        }
    }


    @Put('/delete_nodo/:id')
    async deleteNodo(@Res() res, @Param('id') id: string) {
        const nodo = await this.subgrupoService.getById(id)

        if (nodo) {
            nodo.activo = false
            const subgrupo = await this.subgrupoService.put(id, nodo);
            //if (!subgrupo) throw new NotFoundException("not found resource");
            if (subgrupo instanceof Error) {
                return res.status(HttpStatus.OK).json({
                    Data: null,
                    Message: subgrupo.message,
                    Status: "400",
                    Success: false
                });
            } else {
                if (nodo.hijos.length > 0) {
                    for (var i = 0; i < nodo.hijos.length; i++) {
                        var hijos = nodo.hijos
                        const hijo = await this.subgrupoService.getById(hijos[i])
                        const res2 = await this.subgrupoService.deleteNodo(hijo)
                    }

                }
                return res.status(HttpStatus.OK).json({
                    Data: subgrupo,
                    Message: "Delete successfull",
                    Status: "200",
                    Success: true
                });
            }
        } else {
            return res.status(HttpStatus.OK).json({
                Data: null,
                Message: "Record Not found",
                Status: "404",
                Success: true
            });
        }
    }


    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const subgrupo = await this.planService.getById(id)

        if (subgrupo) {
            subgrupo.activo = false
            //if (!plan) throw new NotFoundException("not found resource");    
            const respuesta = await this.planService.put(id, subgrupo);
            if (respuesta instanceof Error) {
                return res.status(HttpStatus.OK).json({
                    Data: null,
                    Message: respuesta.message,
                    Status: "400",
                    Success: false
                });
            } else {
                return res.status(HttpStatus.OK).json({
                    Data: respuesta,
                    Message: "Delete successfull",
                    Status: "200",
                    Success: true
                });
            }
        } else {
            return res.status(HttpStatus.OK).json({
                Data: null,
                Message: "Record Not found",
                Status: "404",
                Success: true
            });
        }
    }

}
