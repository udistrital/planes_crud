import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'reformulacion' })
export class Reformulacion extends Document {
  _id: string;

  @Prop({ required: true })
  observaciones: string;

  @Prop({ required: true })
  plan_id: string;

  @Prop({ required: true })
  archivos: string;

  @Prop({ required: true })
  estado_id: number;

  @Prop({ required: true })
  activo: boolean;

  @Prop({ required: true })
  fecha_creacion: Date;

  @Prop({ required: true })
  fecha_modificacion: Date;
  
  @Prop({ required: true })
  periodo: string;
}

export const ReformulacionSchema = SchemaFactory.createForClass(Reformulacion);
