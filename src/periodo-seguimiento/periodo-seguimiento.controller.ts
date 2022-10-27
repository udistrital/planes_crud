import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { PeriodoSeguimientoDto } from './dto/periodo-seguimiento.dto';
import { PeriodoSeguimientoService } from './periodo-seguimiento.service';
import { FilterDto} from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('periodo-seguimiento')
export class PeriodoSeguimientoController {
  constructor(private readonly periodoSeguimientoService: PeriodoSeguimientoService) {}

  @Post()
  async post(@Res() res, @Body() periodoSeguimientoDto: PeriodoSeguimientoDto){
    const periodoSeguimiento = await this.periodoSeguimientoService.post(periodoSeguimientoDto);
    res.status(HttpStatus.OK).json(
        {
            Data: periodoSeguimiento,
            Message: "Registration succesfull",
            Status: "201",
            Success: true
        });
  }

  @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto){
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
    async get(@Res() res, @Param('id') id : string){

        const periodoSeguimiento = await this.periodoSeguimientoService.getById(id);
        if (!periodoSeguimiento) throw new NotFoundException("not found resource")
        res.status(HttpStatus.OK).json(
            {
                Data: periodoSeguimiento,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() periodoSeguimientoDto : PeriodoSeguimientoDto){

        const periodoSeguimiento = await this.periodoSeguimientoService.put(id, periodoSeguimientoDto);
        if (!periodoSeguimiento) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: periodoSeguimiento,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Put('/delete_plan/:id')
    async deletePeriodoSeguimiento(@Res() res, @Param('id') id : string){
        const periodoSeguimiento =  await this.periodoSeguimientoService.getById(id)

        periodoSeguimiento.activo = false
        if (!periodoSeguimiento) throw new NotFoundException("not found resource");    
        const respuesta = await this.periodoSeguimientoService.put(id, periodoSeguimiento);
        return res.status(HttpStatus.OK).json({
          Data: respuesta,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const periodoSeguimiento = await this.periodoSeguimientoService.delete(id);
      if (!periodoSeguimiento) throw new NotFoundException("not found resource");    
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
