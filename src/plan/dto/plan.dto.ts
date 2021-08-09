import { ApiProperty} from '@nestjs/swagger';

export class PlanDto{

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly decripcion: string;

    @ApiProperty()
    readonly tipo_plan_id : string;

    @ApiProperty()
    readonly aplicativo_id: string;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;

}

