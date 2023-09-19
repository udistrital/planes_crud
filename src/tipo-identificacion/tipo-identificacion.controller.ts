import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { TipoIdentificacionDto } from "./dto/tipo-identificacion.dto";
import { TipoIdentificacionService } from "./tipo-identificacion.service";
import { FilterDto } from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tipo-identificacion')
@Controller('tipo-identificacion')
export class TipoIdentificacionController {

  constructor(private tipoIdentificacionService: TipoIdentificacionService) { }

  @Post()
  async post(@Res() res, @Body() identiDto: TipoIdentificacionDto) {
    const identi = await this.tipoIdentificacionService.post(identiDto);
    if (identi instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: identi.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: identi,
        Message: "Registration successfull",
        Status: "201",
        Success: true
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const identi = await this.tipoIdentificacionService.getAll(filterDto);
    return res.status(HttpStatus.OK).json(
      {
        Data: identi,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {

    const identi = await this.tipoIdentificacionService.getById(id);
    //if (!identi) throw new NotFoundException("not found resource")
    res.status(HttpStatus.OK).json(
      {
        Data: identi ? identi : null,
        Message: "Registration succesfull",
        Status: "201",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() identiDto: TipoIdentificacionDto) {

    const identi = await this.tipoIdentificacionService.put(id, identiDto);
    //if (!identi) throw new NotFoundException("not found resource");    
    if (identi instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: identi.message,
        Status: "400",
        Success: false
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: identi,
        Message: "Update successfull",
        Status: "200",
        Success: true
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const identi = await this.tipoIdentificacionService.getById(id);
    if (identi) {
      identi.activo = false;
      //if (!plan) throw new NotFoundException("not found resource");    
      const respuesta = await this.tipoIdentificacionService.put(id, identi);
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
