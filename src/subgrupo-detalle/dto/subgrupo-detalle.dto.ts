import { ApiProperty} from '@nestjs/swagger';

export class SubgrupoDetalleDto{

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly descripcion: string;

    @ApiProperty()
    readonly subgrupo_id: string;

    @ApiProperty()
    readonly dato: string;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;

}
