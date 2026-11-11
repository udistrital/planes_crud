import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MARCAS_DE_TIEMPO } from '../../comun/campos';

/** Nombre técnico de un catálogo: minúsculas, números y guion bajo (p. ej. "programas_pnd"). */
export const PATRON_NOMBRE_CATALOGO = /^[a-z0-9_]+$/;

/**
 * Elemento de un catálogo de SISGPLAN: procesos, sectores, programas, productos,
 * municipios, tipos de riesgo... Es la colección general de catálogos: todos la
 * comparten y `catalogo` dice a cuál pertenece cada elemento. Un catálogo nuevo
 * no necesita un módulo nuevo.
 *
 * - `codigo` es único dentro del catálogo y es lo que guardan los documentos que lo usan.
 * - `padre` es el código del elemento del que depende en otro catálogo (p. ej. el
 *   sector de un programa); vacío si no depende de nada.
 */
@Schema({ collection: 'elemento_catalogo', timestamps: MARCAS_DE_TIEMPO })
export class ElementoCatalogo {
  @Prop({ required: true, trim: true, match: PATRON_NOMBRE_CATALOGO })
  catalogo: string;

  @Prop({ required: true, trim: true })
  codigo: string;

  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ default: '', trim: true })
  padre: string;

  @Prop({ default: 0 })
  orden: number;

  @Prop({ default: true })
  activo: boolean;

  fecha_creacion?: Date;
  fecha_modificacion?: Date;
}

export type ElementoCatalogoDocument = HydratedDocument<ElementoCatalogo>;
export const ElementoCatalogoSchema =
  SchemaFactory.createForClass(ElementoCatalogo);

ElementoCatalogoSchema.index({ catalogo: 1, codigo: 1 }, { unique: true });
ElementoCatalogoSchema.index({ catalogo: 1, padre: 1 });
