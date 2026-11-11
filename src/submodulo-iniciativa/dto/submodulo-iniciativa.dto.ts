import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ObservacionDto {
  @ApiProperty({ example: 'Precisar la fuente del dato' })
  readonly texto: string;

  @ApiProperty({
    example: 'PLANEACION',
    description: 'Rol con el que se escribe',
  })
  readonly rol: string;

  @ApiProperty({ example: '1012345678', description: 'Documento del usuario' })
  readonly usuario: string;
}

/** Cuerpo de POST /submodulo-iniciativa/:id/observaciones. */
export class AgregarObservacionDto extends ObservacionDto {
  @ApiPropertyOptional({
    description:
      'Si se envía, el estado del submódulo cambia en la misma operación (p. ej. a "Con observaciones").',
  })
  readonly estado_submodulo_id?: string;
}

export class CrearSubmoduloIniciativaDto {
  @ApiProperty({ description: 'Id del plan de la iniciativa' })
  readonly plan_id: string;

  @ApiProperty({ example: 'problematica', description: 'Clave del submódulo' })
  readonly submodulo: string;

  @ApiProperty()
  readonly estado_submodulo_id: string;

  @ApiPropertyOptional({ type: Object, default: {} })
  readonly dato?: Record<string, unknown>;
}

export class ActualizarSubmoduloIniciativaDto {
  @ApiProperty({
    example: 3,
    description:
      'Versión que se consultó. Si el submódulo cambió desde entonces, responde 409.',
  })
  readonly version: number;

  @ApiPropertyOptional({ type: Object })
  readonly dato?: Record<string, unknown>;

  @ApiPropertyOptional()
  readonly estado_submodulo_id?: string;

  @ApiPropertyOptional()
  readonly activo?: boolean;
}

export const CAMPOS_CREACION = [
  'plan_id',
  'submodulo',
  'estado_submodulo_id',
  'dato',
] as const;

/** Las observaciones no están: solo se agregan, con POST :id/observaciones. */
export const CAMPOS_ACTUALIZABLES = [
  'dato',
  'estado_submodulo_id',
  'activo',
] as const;
