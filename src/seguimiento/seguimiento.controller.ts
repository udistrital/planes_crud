import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { SeguimientoDto } from './dto/seguimiento.dto';
import { SeguimientoService } from './seguimiento.service';

@Controller('seguimiento')
export class SeguimientoController {


    constructor(private seguimientoService: SeguimientoService){}

    @Post()
    async post(@Res() res, @Body() seguimientoDto: SeguimientoDto){
        const seguimiento = await this.seguimientoService.post(seguimientoDto);
        res.status(HttpStatus.OK).json(
            {
                Data: seguimiento,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto){
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
    async get(@Res() res, @Param('id') id : string){

        const seguimiento = await this.seguimientoService.getById(id);
        if (!seguimiento) throw new NotFoundException("not found resource")
        res.status(HttpStatus.OK).json(
            {
                Data: seguimiento,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() seguimientoDto : SeguimientoDto){

        const seguimiento = await this.seguimientoService.put(id, seguimientoDto);
        if (!seguimiento) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: seguimiento,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const seguimiento = await this.seguimientoService.delete(id);
      if (!seguimiento) throw new NotFoundException("not found resource");    
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
