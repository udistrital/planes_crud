import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'plan'})
export class Plan extends Document{

    
    _id: string

    @Prop({required: true })
    nombre: string

    @Prop({required: true })
    descripcion: string

    @Prop({required: true })
    tipo_plan_id: string

    @Prop({required: true })
    aplicativo_id: string

    @Prop({required: true })
    activo: boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const PlanSchema = SchemaFactory.createForClass(Plan);