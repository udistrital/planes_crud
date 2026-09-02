import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection: 'identificacion-detalle'})
export class IdentificacionDetalle {

    _id: string

    @Prop({required: true})
    dato: string

    @Prop({required: true })
    activo: boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date
}

export const IdentificacionDetalleSchema = SchemaFactory.createForClass(IdentificacionDetalle)