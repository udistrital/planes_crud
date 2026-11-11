import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CrearEstadoSubmoduloDto {
  @ApiProperty({ example: 'Sin formular' })
  readonly nombre: string;

  @ApiPropertyOptional()
  readonly descripcion?: string;

  @ApiProperty({ example: 'SF_SUB' })
  readonly codigo_abreviacion: string;

  @ApiProperty({
    example: '#D32F2F',
    description: 'Color del semáforo (#RRGGBB)',
  })
  readonly color: string;

  @ApiPropertyOptional({ default: true })
  readonly activo?: boolean;
}

export class ActualizarEstadoSubmoduloDto extends PartialType(
  CrearEstadoSubmoduloDto,
) {}

export const CAMPOS_ESTADO_SUBMODULO = [
  'nombre',
  'descripcion',
  'codigo_abreviacion',
  'color',
  'activo',
] as const;
