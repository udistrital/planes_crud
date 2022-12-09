import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';

import { SubgrupoDetalleDto } from "./dto/subgrupo-detalle.dto";
import { SubgrupoDetalleService } from "./subgrupo-detalle.service";
import { FilterDto } from '../filters/dto/filter.dto';

@Controller('subgrupo-detalle')
export class SubgrupoDetalleController {


    constructor(private subgrupoDetalleService: SubgrupoDetalleService) { }

    @Post()
    async post(@Res() res, @Body() subgrupoDetalleDto: SubgrupoDetalleDto) {
        const subgrupoDetalle = await this.subgrupoDetalleService.post(subgrupoDetalleDto);
        if (subgrupoDetalle instanceof Error) {
            return res.status(HttpStatus.OK).json({
                Data: null,
                Message: subgrupoDetalle.message,
                Status: "400",
                Success: false
            });
        } else {
            return res.status(HttpStatus.OK).json({
                Data: subgrupoDetalle,
                Message: "Registration successfull",
                Status: "201",
                Success: true
            });
        }
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto) {
        const subgrupoDetalle = await this.subgrupoDetalleService.getAll(filterDto);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupoDetalle,
                Message: "Request succesfull",
                Status: "200",
                Success: true
            });
    }

    @Get('/:id')
    async get(@Res() res, @Param('id') id: string) {

        const subgrupoDetalle = await this.subgrupoDetalleService.getById(id);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupoDetalle ? subgrupoDetalle : null,
                Message: "Request succesfull",
                Status: "200",
                Success: true
            });
    }

    @Get('/detalle/:id')
    async getDetalle(@Res() res, @Param('id') id: string) {

        const subgrupo = await this.subgrupoDetalleService.detalle(id);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupo ? subgrupo : null,
                Message: "Request succesfull",
                Status: "200",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id: string, @Body() subgrupoDetalleDto: SubgrupoDetalleDto) {

        const subgrupoDetalle = await this.subgrupoDetalleService.put(id, subgrupoDetalleDto);
        //if (!subgrupoDetalle) throw new NotFoundException("not found resource");    
        if (subgrupoDetalle instanceof Error) {
            return res.status(HttpStatus.OK).json({
                Data: null,
                Message: subgrupoDetalle.message,
                Status: "400",
                Success: false
            });
        } else {
            return res.status(HttpStatus.OK).json({
                Data: subgrupoDetalle,
                Message: "Update successfull",
                Status: "200",
                Success: true
            });
        }
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const subgrupoDetalle = await this.subgrupoDetalleService.getById(id);

        if (subgrupoDetalle) {
            subgrupoDetalle.activo = false
            //if (!plan) throw new NotFoundException("not found resource");    
            const respuesta = await this.subgrupoDetalleService.put(id, subgrupoDetalle);
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
