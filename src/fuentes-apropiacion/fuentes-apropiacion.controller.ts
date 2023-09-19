import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { FuentesApropiacionDto } from './dto/fuentes-apropiacion.dto';
import { FuentesApropiacionService } from './fuentes-apropiacion.service';
import { FilterDto } from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('fuentes-apropiacion')
@Controller('fuentes-apropiacion')
export class FuentesApropiacionController {
  constructor(private readonly fuentesApropiacionService: FuentesApropiacionService) { }

  @Post()
  async post(@Res() res, @Body() fuentesApropiacionDto: FuentesApropiacionDto) {
    const fuentesApropiacion = await this.fuentesApropiacionService.post(fuentesApropiacionDto);
    if (fuentesApropiacion instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: fuentesApropiacion.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: fuentesApropiacion,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const fuentesApropiacion = await this.fuentesApropiacionService.getAll(filterDto);
    return res.status(HttpStatus.OK).json(
      {
        Data: fuentesApropiacion,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const fuentesApropiacion = await this.fuentesApropiacionService.getById(id);
    if (!fuentesApropiacion) throw new NotFoundException("not found resource")
    res.status(HttpStatus.OK).json(
      {
        Data: fuentesApropiacion ? fuentesApropiacion : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() fuentesApropiacionDto: FuentesApropiacionDto) {

    const fuentesApropiacion = await this.fuentesApropiacionService.put(id, fuentesApropiacionDto);
    //if (!fuentesApropiacion) throw new NotFoundException("not found resource");    
    if (fuentesApropiacion instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: fuentesApropiacion.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: fuentesApropiacion,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const fuentesApropiacion = await this.fuentesApropiacionService.getById(id);
    if (fuentesApropiacion) {
      fuentesApropiacion.activo = false;
      const respuesta = await this.fuentesApropiacionService.put(id, fuentesApropiacion);
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
