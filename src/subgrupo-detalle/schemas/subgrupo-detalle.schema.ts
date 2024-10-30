import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'subgrupo_detalle'})
export class SubgrupoDetalle extends Document{


    @Prop({ required: true })
    nombre: string

    @Prop({ required: true })
    descripcion: string

    @Prop({ required: false })
    requisitos: string

    @Prop({ required: true })
    subgrupo_id: string

    @Prop({ required: true })
    dato: string

    @Prop({ required: false })
    dato_plan: string

    @Prop({ required: false })
    armonizacion_dato: string

    @Prop({ required: true })
    activo: boolean

    @Prop({ required: true })
    fecha_creacion: Date

    @Prop({ required: true })
    fecha_modificacion: Date

}

export const SubgrupoDetalleSchema = SchemaFactory.createForClass(SubgrupoDetalle);
