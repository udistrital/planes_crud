import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'tipo_plan'})
export class TipoPlan extends Document{


    @Prop({required: true })
    nombre: String

    @Prop({required: true })
    descripcion: String


    @Prop({required: true })
    activo: Boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const TipoPlanSchema = SchemaFactory.createForClass(TipoPlan);