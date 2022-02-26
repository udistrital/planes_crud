import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'seguimiento'})
export class Seguimiento extends Document{

    _id: string

    @Prop({required: true })
    nombre: string

    @Prop({required: false })
    descripcion: string

    @Prop({required: true })
    plan_id: string

    @Prop({required: true})
    dato: string

    @Prop({required: true})
    tipo_seguimiento_id: string


    @Prop({required: true})
    estado_seguimiento_id: string


    @Prop({required: true})
    periodo_id: string

    @Prop({required: true })
    activo: boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const SeguimientoSchema = SchemaFactory.createForClass(Seguimiento);