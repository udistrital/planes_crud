import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MARCAS_DE_TIEMPO } from '../../comun/campos';

/**
 * Catálogo de estados de un submódulo (hoja) de una iniciativa: Sin formular,
 * Formulado, Con observaciones, Sin observaciones... El color es el del semáforo.
 */
@Schema({ collection: 'estado_submodulo', timestamps: MARCAS_DE_TIEMPO })
export class EstadoSubmodulo {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ trim: true })
  descripcion: string;

  @Prop({ required: true, unique: true, trim: true })
  codigo_abreviacion: string;

  @Prop({ required: true, match: /^#[0-9A-Fa-f]{6}$/ })
  color: string;

  @Prop({ default: true })
  activo: boolean;

  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

export type EstadoSubmoduloDocument = HydratedDocument<EstadoSubmodulo>;
export const EstadoSubmoduloSchema =
  SchemaFactory.createForClass(EstadoSubmodulo);
