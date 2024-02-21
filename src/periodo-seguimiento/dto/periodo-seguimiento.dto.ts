import { ApiProperty } from '@nestjs/swagger'

export class PeriodoSeguimientoDto {

    _id: string

    @ApiProperty()
    fecha_inicio: Date;

    @ApiProperty()
    fecha_fin: Date;

    @ApiProperty()
    readonly periodo_id: String;

    @ApiProperty()
    tipo_seguimiento_id: String;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    unidades_interes: string;

    @ApiProperty()
    planes_interes: string;

    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;
}
