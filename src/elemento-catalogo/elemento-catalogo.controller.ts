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
import { ElementoCatalogoService } from './elemento-catalogo.service';
import {
  ActualizarElementoCatalogoDto,
  CrearElementoCatalogoDto,
  ResultadoLoteDto,
} from './dto/elemento-catalogo.dto';
import { ElementoCatalogoDocument } from './schemas/elemento-catalogo.schema';

/**
 * Catálogos de SISGPLAN (colección general). Un catálogo completo se consulta con
 * GET /elemento-catalogo?query=catalogo:programas_pnd,activo:true&sortby=orden
 */
@ApiTags('elemento-catalogo')
@UseFilters(RespuestaExcepcionFilter)
@Controller('elemento-catalogo')
export class ElementoCatalogoController {
  constructor(private readonly servicio: ElementoCatalogoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(
    @Body() dto: CrearElementoCatalogoDto,
  ): Promise<Respuesta<ElementoCatalogoDocument>> {
    return respuestaExitosa(
      await this.servicio.crear(dto),
      HttpStatus.CREATED,
      'Registration successful',
    );
  }

  /** Crea o actualiza elementos por catalogo + codigo (no duplica). */
  @Post('lote')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: [CrearElementoCatalogoDto] })
  async cargarLote(
    @Body() elementos: CrearElementoCatalogoDto[],
  ): Promise<Respuesta<ResultadoLoteDto>> {
    return respuestaExitosa(
      await this.servicio.cargarLote(elementos),
      HttpStatus.OK,
      'Successful',
    );
  }

  @Get()
  async listar(
    @Query() filtro: FilterDto,
  ): Promise<Respuesta<ElementoCatalogoDocument[]>> {
    return respuestaExitosa(await this.servicio.listar(filtro));
  }

  @Get(':id')
  async obtener(
    @Param('id') id: string,
  ): Promise<Respuesta<ElementoCatalogoDocument>> {
    return respuestaExitosa(await this.servicio.obtener(id));
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() dto: ActualizarElementoCatalogoDto,
  ): Promise<Respuesta<ElementoCatalogoDocument>> {
    return respuestaExitosa(
      await this.servicio.actualizar(id, dto),
      HttpStatus.OK,
      'Update successful',
    );
  }
}
