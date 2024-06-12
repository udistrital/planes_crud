import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReformulacionService } from './reformulacion.service';
import { ReformulacionDto } from './dto/reformulacion.dto';
import { FilterDto } from 'src/filters/dto/filter.dto';

@ApiTags('reformulacion')
@Controller('reformulacion')
export class ReformulacionController {
  constructor(private reformulacionService: ReformulacionService) {}

  @Post()
  async post(@Res() res, @Body() reformulacionDto: ReformulacionDto) {
    const reformulacion = await this.reformulacionService.post(
      reformulacionDto,
    );
    if (reformulacion instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: reformulacion.message,
        Status: '400',
        Success: false,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: reformulacion,
        Message: 'Registration successfull',
        Status: '201',
        Success: true,
      });
    }
  }

  @Get()
  async getAll(@Res() res, @Query() filterDto: FilterDto) {
    const reformulacion = await this.reformulacionService.getAll(filterDto);
    return res.status(HttpStatus.OK).json({
      Data: reformulacion,
      Message: 'Request succesfull',
      Status: '200',
      Success: true,
    });
  }

  @Get('/:id')
  async get(@Res() res, @Param('id') id: string) {
    const reformulacion = await this.reformulacionService.getById(id);
    //if (!reformulacion) throw new NotFoundException("not found resource")
    res.status(HttpStatus.OK).json({
      Data: reformulacion ? reformulacion : null,
      Message: 'Request succesfull',
      Status: '200',
      Success: true,
    });
  }

  @Put('/:id')
  async put(
    @Res() res,
    @Param('id') id: string,
    @Body() reformulacionDto: ReformulacionDto,
  ) {
    const reformulacion = await this.reformulacionService.put(
      id,
      reformulacionDto,
    );
    //if (!reformulacion) throw new NotFoundException("not found resource");
    if (reformulacion instanceof Error) {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: reformulacion.message,
        Status: '400',
        Success: false,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        Data: reformulacion,
        Message: 'Update successfull',
        Status: '200',
        Success: true,
      });
    }
  }

  @Put('/delete_reformulacion/:id')
  async deletePlan(@Res() res, @Param('id') id: string) {
    const reformulacion = await this.reformulacionService.getById(id);

    if (reformulacion) {
      reformulacion.activo = false;
      //if (!reformulacion) throw new NotFoundException("not found resource");
      const respuesta = await this.reformulacionService.put(id, reformulacion);
      if (respuesta instanceof Error) {
        return res.status(HttpStatus.OK).json({
          Data: null,
          Message: respuesta.message,
          Status: '400',
          Success: false,
        });
      } else {
        return res.status(HttpStatus.OK).json({
          Data: respuesta,
          Message: 'Delete successfull',
          Status: '200',
          Success: true,
        });
      }
    } else {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: 'Record Not found',
        Status: '404',
        Success: true,
      });
    }
  }

  @Delete('/:id')
  async delete(@Res() res, @Param('id') id: string) {
    const reformulacion = await this.reformulacionService.getById(id);

    if (reformulacion) {
      reformulacion.activo = false;
      //if (!reformulacion) throw new NotFoundException("not found resource");
      const respuesta = await this.reformulacionService.put(id, reformulacion);
      if (respuesta instanceof Error) {
        return res.status(HttpStatus.OK).json({
          Data: null,
          Message: respuesta.message,
          Status: '400',
          Success: false,
        });
      } else {
        return res.status(HttpStatus.OK).json({
          Data: respuesta,
          Message: 'Delete successfull',
          Status: '200',
          Success: true,
        });
      }
    } else {
      return res.status(HttpStatus.OK).json({
        Data: null,
        Message: 'Record Not found',
        Status: '404',
        Success: true,
      });
    }
  }
}
