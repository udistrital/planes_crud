import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearElementoCatalogoDto {
  @ApiProperty({
    example: 'programas_pnd',
    description: 'Catálogo al que pertenece',
  })
  readonly catalogo: string;

  @ApiProperty({ example: '4599', description: 'Único dentro del catálogo' })
  readonly codigo: string;

  @ApiProperty({
    example: 'Fortalecimiento de la gestión y dirección del Sector Educación',
  })
  readonly nombre: string;

  @ApiPropertyOptional({
    example: '45',
    description: 'Código del elemento padre (en otro catálogo)',
  })
  readonly padre?: string;

  @ApiPropertyOptional({ example: 1 })
  readonly orden?: number;

  @ApiPropertyOptional({ default: true })
  readonly activo?: boolean;
}

/** catalogo y codigo identifican el elemento y no cambian. */
export class ActualizarElementoCatalogoDto {
  @ApiPropertyOptional()
  readonly nombre?: string;

  @ApiPropertyOptional()
  readonly padre?: string;

  @ApiPropertyOptional()
  readonly orden?: number;

  @ApiPropertyOptional()
  readonly activo?: boolean;
}

/** Respuesta de POST /elemento-catalogo/lote. */
export class ResultadoLoteDto {
  @ApiProperty()
  readonly recibidos: number;

  @ApiProperty()
  readonly creados: number;

  @ApiProperty()
  readonly actualizados: number;

  @ApiProperty({ description: 'Ya existían con los mismos datos' })
  readonly sin_cambios: number;
}

export const CAMPOS_CREACION = [
  'catalogo',
  'codigo',
  'nombre',
  'padre',
  'orden',
  'activo',
] as const;

export const CAMPOS_ACTUALIZABLES = [
  'nombre',
  'padre',
  'orden',
  'activo',
] as const;

/** Máximo de elementos por lote (el cuerpo de una petición no puede pasar de 100 KB). */
export const MAXIMO_POR_LOTE = 1000;
