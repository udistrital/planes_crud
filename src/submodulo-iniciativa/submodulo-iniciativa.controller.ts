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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Respuesta, respuestaExitosa } from '../comun/respuesta';
import { RespuestaExcepcionFilter } from '../comun/respuesta-excepcion.filter';
import { FilterDto } from '../filters/dto/filter.dto';
import {
  ActualizarSubmoduloIniciativaDto,
  AgregarObservacionDto,
  CrearSubmoduloIniciativaDto,
} from './dto/submodulo-iniciativa.dto';
import { SubmoduloIniciativaService } from './submodulo-iniciativa.service';
import { SubmoduloIniciativaDocument } from './schemas/submodulo-iniciativa.schema';

@ApiTags('submodulo-iniciativa')
@UseFilters(RespuestaExcepcionFilter)
@Controller('submodulo-iniciativa')
export class SubmoduloIniciativaController {
  constructor(private readonly servicio: SubmoduloIniciativaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(
    @Body() dto: CrearSubmoduloIniciativaDto,
  ): Promise<Respuesta<SubmoduloIniciativaDocument>> {
    return respuestaExitosa(
      await this.servicio.crear(dto),
      HttpStatus.CREATED,
      'Registration successful',
    );
  }

  @Post('lote')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: [CrearSubmoduloIniciativaDto] })
  async crearLote(
    @Body() dtos: CrearSubmoduloIniciativaDto[],
  ): Promise<Respuesta<SubmoduloIniciativaDocument[]>> {
    return respuestaExitosa(
      await this.servicio.crearLote(dtos),
      HttpStatus.CREATED,
      'Registration successful',
    );
  }

  @Get()
  async listar(
    @Query() filtro: FilterDto,
  ): Promise<Respuesta<SubmoduloIniciativaDocument[]>> {
    return respuestaExitosa(await this.servicio.listar(filtro));
  }

  @Get(':id')
  async obtener(
    @Param('id') id: string,
  ): Promise<Respuesta<SubmoduloIniciativaDocument>> {
    return respuestaExitosa(await this.servicio.obtener(id));
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() dto: ActualizarSubmoduloIniciativaDto,
  ): Promise<Respuesta<SubmoduloIniciativaDocument>> {
    return respuestaExitosa(
      await this.servicio.actualizar(id, dto),
      HttpStatus.OK,
      'Update successful',
    );
  }

  /** Agrega una observación al historial del submódulo (no cambia su versión). */
  @Post(':id/observaciones')
  @HttpCode(HttpStatus.CREATED)
  async agregarObservacion(
    @Param('id') id: string,
    @Body() dto: AgregarObservacionDto,
  ): Promise<Respuesta<SubmoduloIniciativaDocument>> {
    return respuestaExitosa(
      await this.servicio.agregarObservacion(id, dto),
      HttpStatus.CREATED,
      'Registration successful',
    );
  }
}
