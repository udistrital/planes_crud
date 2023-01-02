import { ApiProperty } from '@nestjs/swagger'

export class FuentesApropiacionDto {

    _id: string

    @ApiProperty()
    codigo_abreviacion: String;

    @ApiProperty()
    descripcion: String;

    @ApiProperty()
    presupuesto: Number;

    @ApiProperty()
    nombre: String;


    @ApiProperty()
    activo: boolean;    

    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;
}