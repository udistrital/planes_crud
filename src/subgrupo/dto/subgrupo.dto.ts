import { ApiProperty} from '@nestjs/swagger';
import { Subgrupo } from '../schemas/subgrupo.schema';

export class SubgrupoDto{

    _id: string

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly descripcion: string;

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
