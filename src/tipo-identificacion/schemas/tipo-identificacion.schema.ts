import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'tipo_identificacion'})
export class TipoIdentificacion extends Document{

    _id: string

    @Prop({required: true })
    nombre: string

    @Prop({required: false })
    descripcion: string

    @Prop({required: false})
    codigo_abreviacion: string

    @Prop({required: true })
    activo: boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const TipoIdentificacionSchema = SchemaFactory.createForClass(TipoIdentificacion);