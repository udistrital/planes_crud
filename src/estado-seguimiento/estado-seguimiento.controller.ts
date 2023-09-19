import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { EstadoSeguimientoDto } from './dto/estado-seguimiento.dto';
import { EstadoSeguimientoService } from './estado-seguimiento.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('estado-seguimiento')
@Controller('estado-seguimiento')
export class EstadoSeguimientoController {

  constructor(private estadoSeguimientoService: EstadoSeguimientoService) { }

  @Post()
  async post(@Res() res, @Body() estadoSeguimientoDto: EstadoSeguimientoDto) {
    const estadoSeguimiento = await this.estadoSeguimientoService.post(estadoSeguimientoDto);
    if (estadoSeguimiento instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: estadoSeguimiento.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: estadoSeguimiento,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const estadoSeguimiento = await this.estadoSeguimientoService.getAll(filterDto);
    res.status(HttpStatus.OK).json(
      {
        Data: estadoSeguimiento,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const estadoSeguimiento = await this.estadoSeguimientoService.getById(id);
    res.status(HttpStatus.OK).json(
      {
        Data: estadoSeguimiento ? estadoSeguimiento : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() estadoSeguimientoDto: EstadoSeguimientoDto) {

    const estadoSeguimiento = await this.estadoSeguimientoService.put(id, estadoSeguimientoDto);
    //if (!estadoSeguimiento) throw new NotFoundException("not found resource");    
    if (estadoSeguimiento instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: estadoSeguimiento.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: estadoSeguimiento,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const estadoSeguimiento = await this.estadoSeguimientoService.getById(id);
    estadoSeguimiento.activo = false
    const respuesta = await this.estadoSeguimientoService.put(id, estadoSeguimiento)
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
