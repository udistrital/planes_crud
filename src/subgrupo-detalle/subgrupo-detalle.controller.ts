import { Controller,  Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';

import { SubgrupoDetalleDto } from "./dto/subgrupo-detalle.dto";
import { SubgrupoDetalleService } from "./subgrupo-detalle.service";

@Controller('subgrupo-detalle')
export class SubgrupoDetalleController {


    constructor(private subgrupoDetalleService: SubgrupoDetalleService){}

    @Post()
    async post(@Res() res, @Body() subgrupoDetalleDto: SubgrupoDetalleDto){
        const subgrupoDetalle = await this.subgrupoDetalleService.post(subgrupoDetalleDto);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupoDetalle,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get()
    async getAll(@Res() res){
        const subgrupoDetalle = await this.subgrupoDetalleService.getAll();
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupoDetalle,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get('/:id')
    async get(@Res() res, @Param('id') id : string){

        const subgrupoDetalle = await this.subgrupoDetalleService.getById(id);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupoDetalle,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get('/detalle/:id')
    async getDetalle(@Res() res, @Param('id') id : string){

        const subgrupo = await this.subgrupoDetalleService.detalle(id);
        res.status(HttpStatus.OK).json({
            Data: subgrupo,
            Message: "Registration succesfull",
            Status: "201",
            Success: true
        });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() subgrupoDetalleDto : SubgrupoDetalleDto){

        const subgrupoDetalle = await this.subgrupoDetalleService.put(id, subgrupoDetalleDto);
        if (!subgrupoDetalle) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: subgrupoDetalle,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const subgrupoDetalle =  await this.subgrupoDetalleService.getById(id);
      if(!subgrupoDetalle) throw new NotFoundException("not found resource")

      subgrupoDetalle.activo = false
      const respuesta = await this.subgrupoDetalleService.put(id, subgrupoDetalle)
      return res.status(HttpStatus.OK).json({
        Data: respuesta,
        Message: "Delete successfull",
        Status: "200",
        Success: true
      });
    }

}
