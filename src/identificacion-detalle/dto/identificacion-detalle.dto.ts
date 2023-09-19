import { ApiProperty } from "@nestjs/swagger";

export class IdentificacionDetalleDto {
    
    _id: string;

    @ApiProperty()
    readonly dato: string;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    readonly fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;
}