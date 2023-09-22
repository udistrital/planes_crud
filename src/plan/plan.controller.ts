import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { PlanDto } from "./dto/plan.dto";
import { PlanService } from "./plan.service";
import { FilterDto } from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { NativeError } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('plan')
@Controller('plan')
export class PlanController {

  constructor(private planService: PlanService) { }

  @Post()
  async post(@Res() res, @Body() planDto: PlanDto) {
    const plan = await this.planService.post(planDto);
    if (plan instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: plan.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: plan,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const plan = await this.planService.getAll(filterDto);
    return res.status(HttpStatus.OK).json(
      {
        Data: plan,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const plan = await this.planService.getById(id);
    //if (!plan) throw new NotFoundException("not found resource")
    res.status(HttpStatus.OK).json(
      {
        Data: plan ? plan : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() planDto: PlanDto) {

    const plan = await this.planService.put(id, planDto);
    //if (!plan) throw new NotFoundException("not found resource");
    if (plan instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: plan.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: plan,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Put('/delete_plan/:id')
  async deletePlan(@Res() res, @Param('id') id: string) {
    const plan = await this.planService.getById(id)

    if (plan) {
      plan.activo = false
      //if (!plan) throw new NotFoundException("not found resource");    
      const respuesta = await this.planService.put(id, plan);
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

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const plan = await this.planService.getById(id)

    if (plan) {
      plan.activo = false
      //if (!plan) throw new NotFoundException("not found resource");    
      const respuesta = await this.planService.put(id, plan);
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
