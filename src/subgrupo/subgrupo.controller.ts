import { Controller,  Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';

import { SubgrupoDto } from "./dto/subgrupo.dto";
import { SubgrupoService } from "./subgrupo.service";
import { PlanService } from "../plan/plan.service";

@Controller('subgrupo')
export class SubgrupoController {

    constructor(private subgrupoService: SubgrupoService, private planService : PlanService){}

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

    @Post('/registrar_nodo')
    async postNodo(@Res() res, @Body() subgrupoDto: SubgrupoDto){
        const subgrupo = await this.subgrupoService.post(subgrupoDto);
        const plan = await this.planService.getById(subgrupoDto.padre)
        console.log(plan)
        if (plan == null){
            var padreSubgrupo = await this.subgrupoService.getById(subgrupoDto.padre)
            await padreSubgrupo.hijos.push(subgrupo._id)
            const padreActualizado = await this.subgrupoService.put(subgrupoDto.padre, padreSubgrupo);
            console.log(padreActualizado)
        }

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


    @Put('/delete_nodo/:id')
    async deleteNodo(@Res() res, @Param('id') id : string){

        const nodo = await this.subgrupoService.getById(id)
        nodo.activo = false
        const subgrupo = await this.subgrupoService.put(id, nodo);
        if (!subgrupo) throw new NotFoundException("not found resource");
        if (nodo.hijos.length > 0){
            for(var i = 0; i < nodo.hijos.length; i++){
                var hijos = nodo.hijos
                const hijo = await this.subgrupoService.getById(hijos[i])
                const res2 = await this.subgrupoService.deleteNodo(hijo)
            }
   
        }
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
