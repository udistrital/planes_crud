import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubgrupoDto {
    @ApiPropertyOptional()
    readonly nombre?: string;

    @ApiPropertyOptional()
    readonly descripcion?: string;

    @ApiPropertyOptional()
    readonly padre?: string;

    @ApiPropertyOptional({ type: [String] })
    readonly hijos?: string[];

    @ApiPropertyOptional()
    readonly activo?: boolean;

    @ApiPropertyOptional()
    readonly bandera_tabla?: boolean;

    @ApiPropertyOptional()
    readonly ref?: string;

    @ApiPropertyOptional({ type: String, format: 'date-time' })
    readonly fecha_creacion?: Date;
}
