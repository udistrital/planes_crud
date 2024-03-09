import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException, ParseIntPipe } from '@nestjs/common';
import { PeriodoSeguimientoService } from './periodo-seguimiento.service';
import { FilterDto } from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PeriodoSeguimientoDto } from './dto/periodo-seguimiento.dto';

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

  @Get('buscar-unidad/:unidadId')
  // @ApiParam({ name: 'unidadId', description: 'ID de la unidad a buscar' })
  async buscarRegistrosPorUnidad(@Res() res, @Param('unidadId') unidadId: string) {
    const registrosEncontrados = await this.periodoSeguimientoService.buscarRegistrosPorUnidadInteres(unidadId);
    if (!registrosEncontrados || registrosEncontrados.length === 0) throw new NotFoundException("not found resource")

    res.status(HttpStatus.OK).json(
      {
        Data: registrosEncontrados ? registrosEncontrados : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Post('buscar-unidad-planes/:numeroCaso')
  @ApiParam({ name: 'numeroCaso', description: 'Numero de caso para buscar registros' })
  async buscarRegistrosPorUnidad_Plan(@Res() res, @Body() data: PeriodoSeguimientoDto, @Param('numeroCaso', ParseIntPipe) numeroCaso: number) {
    const registrosEncontrados = await this.periodoSeguimientoService.obtenerRegistrosExistencia(data,numeroCaso);
    if (!registrosEncontrados || registrosEncontrados.length === 0) throw new NotFoundException("not found resource")

    res.status(HttpStatus.OK).json(
      {
        Data: registrosEncontrados ? registrosEncontrados : null,
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
