import { ApiProperty} from '@nestjs/swagger';

export class EstadoSeguimientoDto{

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly descripcion: string;

    @ApiProperty()
    readonly codigo_abreviacion: string;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;
    
}