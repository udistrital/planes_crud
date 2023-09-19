import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { SeguimientoDto } from './dto/seguimiento.dto';
import { SeguimientoService } from './seguimiento.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('seguimiento')
@Controller('seguimiento')
export class SeguimientoController {


  constructor(private seguimientoService: SeguimientoService) { }

  @Post()
  async post(@Res() res, @Body() seguimientoDto: SeguimientoDto) {
    const seguimiento = await this.seguimientoService.post(seguimientoDto);
    if (seguimiento instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: seguimiento.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: seguimiento,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const seguimiento = await this.seguimientoService.getAll(filterDto);
    return res.status(HttpStatus.OK).json(
      {
        Data: seguimiento,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const seguimiento = await this.seguimientoService.getById(id);
    //if (!seguimiento) throw new NotFoundException("not found resource")
    res.status(HttpStatus.OK).json(
      {
        Data: seguimiento ? seguimiento : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() seguimientoDto: SeguimientoDto) {

    const seguimiento = await this.seguimientoService.put(id, seguimientoDto);
    //if (!seguimiento) throw new NotFoundException("not found resource");    
    if (seguimiento instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: seguimiento.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: seguimiento,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const seguimiento = await this.seguimientoService.getById(id);
    if (seguimiento) {
      seguimiento.activo = false
      //if (!plan) throw new NotFoundException("not found resource");    
      const respuesta = await this.seguimientoService.put(id, seguimiento);
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
