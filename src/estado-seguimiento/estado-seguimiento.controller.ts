import { Query, Controller,  Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { EstadoSeguimientoDto } from './dto/estado-seguimiento.dto';
import { EstadoSeguimientoService } from './estado-seguimiento.service';

@Controller('estado-seguimiento')
export class EstadoSeguimientoController {

    constructor(private estadoSeguimientoService: EstadoSeguimientoService){}

    @Post()
    async post(@Res() res, @Body() estadoSeguimientoDto: EstadoSeguimientoDto){
        const estadoSeguimiento = await this.estadoSeguimientoService.post(estadoSeguimientoDto);
        res.status(HttpStatus.OK).json(
            {
                Data: estadoSeguimiento,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto){
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
    async get(@Res() res, @Param('id') id : string){

        const estadoSeguimiento = await this.estadoSeguimientoService.getById(id);
        res.status(HttpStatus.OK).json(
            {
                Data: estadoSeguimiento,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() estadoSeguimientoDto : EstadoSeguimientoDto){

        const estadoSeguimiento = await this.estadoSeguimientoService.put(id, estadoSeguimientoDto);
        if (!estadoSeguimiento) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: estadoSeguimiento,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const estadoSeguimiento = await this.estadoSeguimientoService.getById(id);
      if (!estadoSeguimiento) throw new NotFoundException("not found resource");    

      estadoSeguimiento.activo = false
      const respuesta = await this.estadoSeguimientoService.put(id, estadoSeguimiento)
      return res.status(HttpStatus.OK).json({
        Data: respuesta,
        Message: "Delete successfull",
        Status: "200",
        Success: true
      });
    }
}
