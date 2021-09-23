import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection: 'estado_plan'})
export class EstadoPlan extends Document{

    @Prop({required: true })
    nombre: string

    @Prop({required: true })
    descripcion: string

    @Prop({required: true})
    codigo_abreviacion: string

    @Prop({required: true })
    activo: boolean

    @Prop({required: true })
    fecha_creacion: Date

    @Prop({required: true })
    fecha_modificacion: Date

}

export const EstadoPlanSchema = SchemaFactory.createForClass(EstadoPlan);
