import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'subgrupo'})
export class Subgrupo extends Document{


    @Prop({required: true })
    nombre: String

    @Prop({required: true })
    descripcion: String

    @Prop({required: true })
    padre: String

    @Prop()
    hijos: String[]

    @Prop({required: true })
    activo: Boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const SubgrupoSchema = SchemaFactory.createForClass(Subgrupo);