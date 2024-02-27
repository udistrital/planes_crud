import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'subgrupo'})
export class Subgrupo extends Document{

    _id: string

    @Prop({required: true })
    nombre: string

    @Prop({required: true })
    descripcion: string

    @Prop({required: true })
    padre: string

    @Prop()
    hijos: string[]

    @Prop({required: true })
    activo: boolean

    @Prop({required: false })
    bandera_tabla: boolean
    
    @Prop({required: false })
    ref: string

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const SubgrupoSchema = SchemaFactory.createForClass(Subgrupo);