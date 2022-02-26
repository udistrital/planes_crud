import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'estado_seguimiento'})
export class EstadoSeguimiento extends Document{

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

export const EstadoSeguimientoSchema = SchemaFactory.createForClass(EstadoSeguimiento);