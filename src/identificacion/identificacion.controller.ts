import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { IdentificacionDto } from "./dto/identificacion.dto";
import { IdentificacionService } from "./identificacion.service";
import { FilterDto } from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('identificacion')
export class IdentificacionController {

  constructor(private identificacionService: IdentificacionService) { }

  @Post()
  async post(@Res() res, @Body() identiDto: IdentificacionDto) {
    const identi = await this.identificacionService.post(identiDto);
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
    const identi = await this.identificacionService.getAll(filterDto);
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

    const identi = await this.identificacionService.getById(id);
    //if (!identi) throw new NotFoundException("not found resource")
    res.status(HttpStatus.OK).json(
      {
        Data: identi ? identi : null,
        Message: "Request succesfull",
        Status: "200",
        Success: true
      });
  }

  @Put('/:id')
  async put(@Res() res, @Param('id') id: string, @Body() identiDto: IdentificacionDto) {

    const identi = await this.identificacionService.put(id, identiDto);
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
    const identi = await this.identificacionService.delete(id);
    //if (!identi) throw new NotFoundException("not found resource");    
    return res.status(HttpStatus.OK).json({
      Data: {
        _id: id
      },
      Message: "Delete successfull",
      Status: "200",
      Success: true
    });
  }

}
