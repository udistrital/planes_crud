import { Controller,  Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';

import { SubgrupoDto } from "./dto/subgrupo.dto";
import { SubgrupoService } from "./subgrupo.service";

@Controller('subgrupo')
export class SubgrupoController {

    constructor(private subgrupoService: SubgrupoService){}

    @Post()
    async post(@Res() res, @Body() subgrupoDto: SubgrupoDto){
        const subgrupo = await this.subgrupoService.post(subgrupoDto);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupo,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get()
    async getAll(@Res() res){
        const subgrupo = await this.subgrupoService.getAll();
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupo,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get('/:id')
    async get(@Res() res, @Param('id') id : string){

        const subgrupo = await this.subgrupoService.getById(id);
        res.status(HttpStatus.OK).json(
            {
                Data: subgrupo,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get('/hijos/:id')
    async getHijos(@Res() res, @Param('id') id : string){

        const subgrupo = await this.subgrupoService.hijos(id);
        res.status(HttpStatus.OK).json({
            Data: subgrupo,
            Message: "Registration succesfull",
            Status: "201",
            Success: true
        });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() subgrupoDto : SubgrupoDto){

        const subgrupo = await this.subgrupoService.put(id, subgrupoDto);
        if (!subgrupo) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: subgrupo,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const subgrupo = await this.subgrupoService.delete(id);
      if (!subgrupo) throw new NotFoundException("not found resource");    
      return res.status(HttpStatus.OK).json({
        Data: {
          _id: id
        },
        Message: "Delete successfull",
        Status: "200",
        Success: true
      });
    }

}
