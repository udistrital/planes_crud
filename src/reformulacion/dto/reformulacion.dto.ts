import { ApiProperty } from '@nestjs/swagger';

export class ReformulacionDto {
  _id: string;

  @ApiProperty()
  readonly observaciones: string;

  @ApiProperty()
  readonly archivos: string;

  @ApiProperty()
  activo: boolean;

  @ApiProperty()
  readonly plan_id: string;

  @ApiProperty()
  readonly fecha_creacion: Date;

  @ApiProperty()
  fecha_modificacion: Date;
}
