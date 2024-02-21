import { ApiProperty} from '@nestjs/swagger';

export class SeguimientoDto{


    _id: string

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly descripcion: string;

    @ApiProperty()
    readonly plan_id: string;

    @ApiProperty()
    readonly dato: string;

    @ApiProperty()
    readonly tipo_seguimiento_id: string;

    @ApiProperty()
    readonly estado_seguimiento_id: string;

    @ApiProperty()
    periodo_seguimiento_id: string;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    fecha_inicio: Date;

    @ApiProperty()
    fecha_fin: Date;
    
    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;

}

