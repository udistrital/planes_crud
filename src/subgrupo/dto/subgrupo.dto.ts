import { ApiProperty} from '@nestjs/swagger';

export class SubgrupoDto{

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly decripcion: string;

    @ApiProperty()
    readonly padre: string;

    @ApiProperty()
    readonly hijos: string[];

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;

}
