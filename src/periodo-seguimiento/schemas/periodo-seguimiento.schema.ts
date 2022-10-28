import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { animationFrameScheduler } from "rxjs";

@Schema({ collection: 'periodo_seguimiento' })
export class PeriodoSeguimiento extends Document {


    _id: string

    @Prop({ required: true })
    fecha_inicio: Date;

    @Prop({ required: true })
    fecha_fin: Date;

    @Prop({ required: true })
    periodo_id: String;

    @Prop({ required: true })
    activo: boolean;

    @Prop({ required: true })
    fecha_creacion: Date;

    @Prop({ required: true })
    fecha_modificacion: Date;
}

export const PeriodoSeguimientoSchema = SchemaFactory.createForClass(PeriodoSeguimiento)