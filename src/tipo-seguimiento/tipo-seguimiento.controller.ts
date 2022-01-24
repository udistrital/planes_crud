import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { TipoSeguimientoDto } from './dto/tipo-seguimiento.dto';
import { TipoSeguimientoService } from './tipo-seguimiento.service';

@Controller('tipo-seguimiento')
export class TipoSeguimientoController {


    constructor(private tipoSeguimientoService: TipoSeguimientoService){}

    @Post()
    async post(@Res() res, @Body() tipoSeguimientoDto: TipoSeguimientoDto){
        const tipoSeguimiento = await this.tipoSeguimientoService.post(tipoSeguimientoDto);
        res.status(HttpStatus.OK).json(
            {
                Data: tipoSeguimiento,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto){
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
    async get(@Res() res, @Param('id') id : string){

        const tipoSeguimiento = await this.tipoSeguimientoService.getById(id);
        if (!tipoSeguimiento) throw new NotFoundException("not found resource")
        res.status(HttpStatus.OK).json(
            {
                Data: tipoSeguimiento,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() tipoSeguimientoDto : TipoSeguimientoDto){

        const tipoSeguimiento = await this.tipoSeguimientoService.put(id, tipoSeguimientoDto);
        if (!tipoSeguimiento) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: tipoSeguimiento,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const tipoSeguimiento = await this.tipoSeguimientoService.delete(id);
      if (!tipoSeguimiento) throw new NotFoundException("not found resource");    
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
