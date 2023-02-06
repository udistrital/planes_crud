import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { animationFrameScheduler } from "rxjs";

@Schema({ collection: 'fuentes_apropiacion' })
export class FuentesApropiacion extends Document {


    _id: string

    @Prop({ required: false })
    codigo_abreviacion: String;

    @Prop({ required: true })
    descripcion: String;

    @Prop({ required: true })
    presupuesto: Number;

    @Prop({ required: true })
    presupuestoDisponible: Number;

    @Prop({ required: true })
    nombre: String

    @Prop({ required: true })
    activo: boolean;

    @Prop({ required: false })
    fecha_creacion: Date;

    @Prop({ required: false })
    fecha_modificacion: Date;
}

export const FuentesApropiacionSchema = SchemaFactory.createForClass(FuentesApropiacion)