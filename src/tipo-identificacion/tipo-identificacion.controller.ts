import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { TipoIdentificacionDto } from "./dto/tipo-identificacion.dto";
import { TipoIdentificacionService } from "./tipo-identificacion.service";
import { FilterDto} from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('tipo-identificacion')
export class TipoIdentificacionController {

    constructor(private tipoIdentificacionService: TipoIdentificacionService){}

    @Post()
    async post(@Res() res, @Body() identiDto: TipoIdentificacionDto){
        const identi = await this.tipoIdentificacionService.post(identiDto);
        res.status(HttpStatus.OK).json(
            {
                Data: identi,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto){
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
    async get(@Res() res, @Param('id') id : string){

        const identi = await this.tipoIdentificacionService.getById(id);
        if (!identi) throw new NotFoundException("not found resource")
        res.status(HttpStatus.OK).json(
            {
                Data: identi,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() identiDto : TipoIdentificacionDto){

        const identi = await this.tipoIdentificacionService.put(id, identiDto);
        if (!identi) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: identi,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const identi = await this.tipoIdentificacionService.delete(id);
      if (!identi) throw new NotFoundException("not found resource");    
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
