import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'seguimiento_detalle' })
export class SeguimientoDetalle extends Document {


    @Prop({ required: true })
    cualitativo: string

    @Prop({ required: false })
    cuantitativo: string

    @Prop({ required: true })
    estado: string

    @Prop({ required: true })
    evidencia: string

    @Prop({ required: true })
    informacion: string

    @Prop({ required: true })
    activo: boolean
   
    @Prop({ required: true })
    fecha_creacion: Date

    @Prop({ required: true })
    fecha_modificacion: Date

}

export const SeguimientoDetalleSchema = SchemaFactory.createForClass(SeguimientoDetalle);