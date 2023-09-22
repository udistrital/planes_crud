import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { PeriodoSeguimientoDto } from './dto/periodo-seguimiento.dto';
import { PeriodoSeguimientoService } from './periodo-seguimiento.service';
import { FilterDto } from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('periodo-seguimiento')
@Controller('periodo-seguimiento')
export class PeriodoSeguimientoController {
  constructor(private readonly periodoSeguimientoService: PeriodoSeguimientoService) { }

  @Post()
  async post(@Res() res, @Body() periodoSeguimientoDto: PeriodoSeguimientoDto) {
    const periodoSeguimiento = await this.periodoSeguimientoService.post(periodoSeguimientoDto);
    if (periodoSeguimiento instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: periodoSeguimiento.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: periodoSeguimiento,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const periodoSeguimiento = await this.periodoSeguimientoService.getAll(filterDto);
    return res.status(HttpStatus.OK).json(
      {
        Data: periodoSeguimiento,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const periodoSeguimiento = await this.periodoSeguimientoService.getById(id);
    if (!periodoSeguimiento) throw new NotFoundException("not found resource")
    res.status(HttpStatus.OK).json(
      {
        Data: periodoSeguimiento ? periodoSeguimiento : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() periodoSeguimientoDto: PeriodoSeguimientoDto) {

    const periodoSeguimiento = await this.periodoSeguimientoService.put(id, periodoSeguimientoDto);
    //if (!periodoSeguimiento) throw new NotFoundException("not found resource");    
    if (periodoSeguimiento instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: periodoSeguimiento.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: periodoSeguimiento,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const periodoSeguimiento = await this.periodoSeguimientoService.getById(id);
    if (periodoSeguimiento) {
      periodoSeguimiento.activo = false;
      const respuesta = await this.periodoSeguimientoService.put(id, periodoSeguimiento);
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
        Success: false
      });
    }
  }

}
