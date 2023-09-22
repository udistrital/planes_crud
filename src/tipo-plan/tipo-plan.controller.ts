import { Query, Controller, Post, Get, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { TipoPlanDto } from "./dto/tipo-plan.dto";
import { TipoPlanService } from "./tipo-plan.service";
import { FilterDto } from '../filters/dto/filter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tipo-plan')
@Controller('tipo-plan')
export class TipoPlanController {

  constructor(private tipoPlanService: TipoPlanService) { }

  @Post()
  async post(@Res() res, @Body() tipoPlanDto: TipoPlanDto) {
    const tipoPlan = await this.tipoPlanService.post(tipoPlanDto);
    if (tipoPlan instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: tipoPlan.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: tipoPlan,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const tipoPlan = await this.tipoPlanService.getAll(filterDto);
    res.status(HttpStatus.OK).json(
      {
        Data: tipoPlan,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const tipoPlan = await this.tipoPlanService.getById(id);
    res.status(HttpStatus.OK).json(
      {
        Data: tipoPlan ? tipoPlan : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() tipoPlanDto: TipoPlanDto) {

    const tipoPlan = await this.tipoPlanService.put(id, tipoPlanDto);
    //if (!tipoPlan) throw new NotFoundException("not found resource");    
    if (tipoPlan instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: tipoPlan.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: tipoPlan,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const tipoPlan = await this.tipoPlanService.getById(id);
    //if (!tipoPlan) throw new NotFoundException("not found resource");    

    if (tipoPlan) {
      tipoPlan.activo = false
      //if (!plan) throw new NotFoundException("not found resource");    
      const respuesta = await this.tipoPlanService.put(id, tipoPlan);
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
