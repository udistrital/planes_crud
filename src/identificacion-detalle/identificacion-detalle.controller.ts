import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { IdentificacionDetalleService } from './identificacion-detalle.service';
import { IdentificacionDetalleDto } from './dto/identificacion-detalle.dto';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('identificacion-detalle')
@Controller('identificacion-detalle')
export class IdentificacionDetalleController {
    constructor (
        private identificacionDetalleService: IdentificacionDetalleService
    ) {}

    @Post()
    async post(@Res() res, @Body() identificacionDetalleDto: IdentificacionDetalleDto) {
        const identificacionDetalle = await this.identificacionDetalleService.post(identificacionDetalleDto);
        if (identificacionDetalle instanceof Error) {
            return res.status(HttpStatus.OK).json({
                Data: null,
                Message: identificacionDetalle.message,
                Status: "400",
                Success: false
            });
        } else {
            return res.status(HttpStatus.OK).json({
                Data: identificacionDetalle,
                Message: "Registration successfull",
                Status: "201",
                Success: true
              });
        }
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto) {
        const identificacionDetalle = await this.identificacionDetalleService.getAll(filterDto);
        return res.status(HttpStatus.OK).json(
            {
              Data: identificacionDetalle,
              Message: "Request succesfull",
              Status: "200",
              Success: true
            });
    }

    @Get('/:id')
    async get(@Res() res, @Param('id') id: string) {
        const identificacionDetalle = await this.identificacionDetalleService.getById(id);
        res.status(HttpStatus.OK).json(
            {
              Data: identificacionDetalle ? identificacionDetalle : null,
              Message: "Request succesfull",
              Status: "200",
              Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id: string, @Body() identificacionDetalleDto: IdentificacionDetalleDto) {
        const identificacionDetalle = await this.identificacionDetalleService.put(id, identificacionDetalleDto);
        if (identificacionDetalle instanceof Error) {
            return res.status(HttpStatus.OK).json({
              Data: null,
              Message: identificacionDetalle.message,
              Status: "400",
              Success: false
            });
          } else {
            return res.status(HttpStatus.OK).json({
              Data: identificacionDetalle,
              Message: "Update successfull",
              Status: "200",
              Success: true
            });
          }
    }
    
    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const identificacionDetalle = await this.identificacionDetalleService.delete(id);
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
