import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';

import { EstadoPlanDto } from "./dto/estado-plan.dto";
import { EstadoPlanService } from "./estado-plan.service";
import { FilterDto } from '../filters/dto/filter.dto';

@Controller('estado-plan')
export class EstadoPlanController {

  constructor(private estadoPlanService: EstadoPlanService) { }

  @Post()
  async post(@Res() res, @Body() estadoPlanDto: EstadoPlanDto) {
    const estadoPlan = await this.estadoPlanService.post(estadoPlanDto);
    if (estadoPlan instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: estadoPlan.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: estadoPlan,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const estadoPlan = await this.estadoPlanService.getAll(filterDto);
    res.status(HttpStatus.OK).json(
      {
        Data: estadoPlan,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const estadoPlan = await this.estadoPlanService.getById(id);
    res.status(HttpStatus.OK).json(
      {
        Data: estadoPlan ? estadoPlan : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() estadoPlanDto: EstadoPlanDto) {

    const estadoPlan = await this.estadoPlanService.put(id, estadoPlanDto);
    //if (!estadoPlan) throw new NotFoundException("not found resource");    
    if (estadoPlan instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: estadoPlan.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: estadoPlan,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const estadoPlan = await this.estadoPlanService.getById(id);
    //if (!estadoPlan) throw new NotFoundException("not found resource");    

    estadoPlan.activo = false
    const respuesta = await this.estadoPlanService.put(id, estadoPlan)
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
  }
}
