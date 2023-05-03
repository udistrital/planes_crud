import { ApiProperty} from '@nestjs/swagger';

export class SeguimientoDetalleDto{

    @ApiProperty()
    readonly cualitativo: string;

    @ApiProperty()
    readonly cuantitativo: string;

    @ApiProperty()
    readonly estado: string;

    @ApiProperty()
    readonly evidencia: string;

    @ApiProperty()
    readonly informacion: string;

    @ApiProperty()
    activo: boolean;
 
    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;

}

