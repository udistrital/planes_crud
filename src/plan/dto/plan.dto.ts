import { ApiProperty} from '@nestjs/swagger';

export class PlanDto{

    _id: string

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly descripcion: string;

    @ApiProperty()
    readonly tipo_plan_id : string;

    @ApiProperty()
    readonly documento_id : string;

    @ApiProperty()
    formato: boolean;

    @ApiProperty()
    readonly vigencia: string;

    @ApiProperty()
    readonly dependencia_id: string;

    @ApiProperty()
    readonly aplicativo_id: string;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    readonly estado_plan_id : string;

    @ApiProperty()
    readonly padre_plan_id : string;

    @ApiProperty()
    readonly arbol_padre_id : string;

    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    formato_id: string;

    @ApiProperty()
    nueva_estructura: boolean;

    @ApiProperty()
    fecha_modificacion: Date;

}

