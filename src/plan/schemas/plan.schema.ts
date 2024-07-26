import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { animationFrameScheduler } from "rxjs";

@Schema({collection: 'plan'})
export class Plan extends Document{

    
    _id: string

    @Prop({required: true })
    nombre: string

    @Prop({required: true })
    descripcion: string

    @Prop({required: true })
    tipo_plan_id: string

    @Prop({required: false })
    documento_id: string

    @Prop({required: false })
    formato: boolean

    @Prop({required: false })
    vigencia : string

    @Prop({required: false })
    vigencia_aplica: string

    @Prop({required: false })
    dependencia_id: string

    @Prop({required: true })
    aplicativo_id: string

    @Prop({required: true })
    activo: boolean

    @Prop({required: false })
    estado_plan_id: string

    @Prop({required: false })
    padre_plan_id: string

    @Prop({required: false })
    arbol_padre_id: string

    @Prop({required: false })
    formato_id: string

    @Prop({required: false })
    nueva_estructura: boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const PlanSchema = SchemaFactory.createForClass(Plan);