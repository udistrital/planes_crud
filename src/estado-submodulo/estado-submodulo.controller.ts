import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Respuesta, respuestaExitosa } from '../comun/respuesta';
import { RespuestaExcepcionFilter } from '../comun/respuesta-excepcion.filter';
import { FilterDto } from '../filters/dto/filter.dto';
import {
  ActualizarEstadoSubmoduloDto,
  CrearEstadoSubmoduloDto,
} from './dto/estado-submodulo.dto';
import { EstadoSubmoduloService } from './estado-submodulo.service';
import { EstadoSubmoduloDocument } from './schemas/estado-submodulo.schema';

@ApiTags('estado-submodulo')
@UseFilters(RespuestaExcepcionFilter)
@Controller('estado-submodulo')
export class EstadoSubmoduloController {
  constructor(private readonly servicio: EstadoSubmoduloService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(
    @Body() dto: CrearEstadoSubmoduloDto,
  ): Promise<Respuesta<EstadoSubmoduloDocument>> {
    return respuestaExitosa(
      await this.servicio.crear(dto),
      HttpStatus.CREATED,
      'Registration successful',
    );
  }

  @Get()
  async listar(
    @Query() filtro: FilterDto,
  ): Promise<Respuesta<EstadoSubmoduloDocument[]>> {
    return respuestaExitosa(await this.servicio.listar(filtro));
  }

  @Get(':id')
  async obtener(
    @Param('id') id: string,
  ): Promise<Respuesta<EstadoSubmoduloDocument>> {
    return respuestaExitosa(await this.servicio.obtener(id));
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() dto: ActualizarEstadoSubmoduloDto,
  ): Promise<Respuesta<EstadoSubmoduloDocument>> {
    return respuestaExitosa(
      await this.servicio.actualizar(id, dto),
      HttpStatus.OK,
      'Update successful',
    );
  }
}
