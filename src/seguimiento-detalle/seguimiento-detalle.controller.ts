import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { SeguimientoDetalleDto } from './dto/seguimiento-detalle.dto';
import { SeguimientoDetalleService } from './seguimiento-detalle.service';

@Controller('seguimiento-detalle')
export class SeguimientoDetalleController {


  constructor(private seguimientoDetalleService: SeguimientoDetalleService) { }

  @Post()
  async post(@Res() res, @Body() seguimientoDetalleDto: SeguimientoDetalleDto) {
    const seguimientoDetalle = await this.seguimientoDetalleService.post(seguimientoDetalleDto);
    if (seguimientoDetalle instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: seguimientoDetalle.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: seguimientoDetalle,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const seguimientoDetalle = await this.seguimientoDetalleService.getAll(filterDto);
    return res.status(HttpStatus.OK).json(
      {
        Data: seguimientoDetalle,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const seguimientoDetalle = await this.seguimientoDetalleService.getById(id);
    res.status(HttpStatus.OK).json(
      {
        Data: seguimientoDetalle ? seguimientoDetalle : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() seguimientoDetalleDto: SeguimientoDetalleDto) {

    const seguimientoDetalle = await this.seguimientoDetalleService.put(id, seguimientoDetalleDto);
    if (seguimientoDetalle instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: seguimientoDetalle.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: seguimientoDetalle,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const seguimientoDetalle = await this.seguimientoDetalleService.getById(id);
    if (seguimientoDetalle) {
      seguimientoDetalle.activo = false
      const respuesta = await this.seguimientoDetalleService.put(id, seguimientoDetalle);
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
