import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'subgrupo_detalle'})
export class SubgrupoDetalle extends Document{


    @Prop({required: true })
    nombre: String

    @Prop({required: true })
    descripcion: String

    @Prop({required: true })
    subgrupo_id: String

    @Prop({ type: Object})
    dato

    @Prop({required: true })
    activo: Boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const SubgrupoDetalleSchema = SchemaFactory.createForClass(SubgrupoDetalle);