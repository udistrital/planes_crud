import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { TipoSeguimientoDto } from './dto/tipo-seguimiento.dto';
import { TipoSeguimientoService } from './tipo-seguimiento.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tipo-seguimiento')
@Controller('tipo-seguimiento')
export class TipoSeguimientoController {


  constructor(private tipoSeguimientoService: TipoSeguimientoService) { }

  @Post()
  async post(@Res() res, @Body() tipoSeguimientoDto: TipoSeguimientoDto) {
    const tipoSeguimiento = await this.tipoSeguimientoService.post(tipoSeguimientoDto);
    if (tipoSeguimiento instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: tipoSeguimiento.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: tipoSeguimiento,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const tipoSeguimiento = await this.tipoSeguimientoService.getAll(filterDto);
    return res.status(HttpStatus.OK).json(
      {
        Data: tipoSeguimiento,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const tipoSeguimiento = await this.tipoSeguimientoService.getById(id);
    if (!tipoSeguimiento) throw new NotFoundException("not found resource")
    res.status(HttpStatus.OK).json(
      {
        Data: tipoSeguimiento ? tipoSeguimiento : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() tipoSeguimientoDto: TipoSeguimientoDto) {

    const tipoSeguimiento = await this.tipoSeguimientoService.put(id, tipoSeguimientoDto);
    //if (!tipoSeguimiento) throw new NotFoundException("not found resource");    
    if (tipoSeguimiento instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: tipoSeguimiento.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: tipoSeguimiento,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const tipoSeguimiento = await this.tipoSeguimientoService.getById(id);
    //if (!tipoSeguimiento) throw new NotFoundException("not found resource");    
    if (tipoSeguimiento) {
      tipoSeguimiento.activo = false
      //if (!plan) throw new NotFoundException("not found resource");    
      const respuesta = await this.tipoSeguimientoService.put(id, tipoSeguimiento);
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
