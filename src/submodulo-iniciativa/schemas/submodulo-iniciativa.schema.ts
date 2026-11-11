import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { MARCAS_DE_TIEMPO } from '../../comun/campos';

export const MAXIMO_TEXTO_OBSERVACION = 4000;

/**
 * Comentario sobre el submódulo completo. Las observaciones forman un historial:
 * se agregan y no se reemplazan.
 */
@Schema()
export class Observacion {
  @Prop({ required: true, trim: true, maxlength: MAXIMO_TEXTO_OBSERVACION })
  texto: string;

  /** Rol con el que se escribió, p. ej. PLANEACION o JEFE_DEPENDENCIA. */
  @Prop({ default: '', trim: true })
  rol: string;

  /** Documento del usuario que la escribió. */
  @Prop({ default: '', trim: true })
  usuario: string;

  @Prop({ type: Date })
  fecha: Date;
}

const ObservacionSchema = SchemaFactory.createForClass(Observacion);

/**
 * Datos diligenciados de un submódulo (hoja) de una iniciativa formulada con una
 * plantilla de Construcción. `dato` es un JSON legible armado con las claves
 * de la plantilla. `version` aumenta en cada actualización y permite detectar
 * ediciones simultáneas.
 */
@Schema({
  collection: 'submodulo_iniciativa',
  timestamps: MARCAS_DE_TIEMPO,
  minimize: false,
})
export class SubmoduloIniciativa {
  @Prop({ required: true, index: true })
  plan_id: string;

  /** Clave del submódulo en la plantilla (nodo de segundo nivel, dentro de un módulo), p. ej. "problematica". */
  @Prop({ required: true, trim: true })
  submodulo: string;

  @Prop({ required: true })
  estado_submodulo_id: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  dato: Record<string, unknown>;

  @Prop({ type: [ObservacionSchema], default: [] })
  observaciones: Observacion[];

  @Prop({ default: 0, min: 0 })
  version: number;

  @Prop({ default: true })
  activo: boolean;

  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

export type SubmoduloIniciativaDocument = HydratedDocument<SubmoduloIniciativa>;
export const SubmoduloIniciativaSchema =
  SchemaFactory.createForClass(SubmoduloIniciativa);

SubmoduloIniciativaSchema.index({ plan_id: 1, submodulo: 1 }, { unique: true });
