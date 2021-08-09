import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'plan'})
export class Plan extends Document{


    @Prop({required: true })
    nombre: String

    @Prop({required: true })
    descripcion: String

    @Prop({required: true })
    tipo_plan_id: String

    @Prop({required: true })
    aplicativo_id: String

    @Prop({required: true })
    activo: Boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const PlanSchema = SchemaFactory.createForClass(Plan);