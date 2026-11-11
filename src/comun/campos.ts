/**
 * Copia solo los campos permitidos que vienen definidos. Evita que un cliente
 * cambie campos que no le corresponden (_id, fechas, versión...).
 */
export function soloCampos<T extends object, K extends keyof T>(
  origen: T,
  permitidos: readonly K[],
): Partial<Pick<T, K>> {
  const resultado: Partial<Pick<T, K>> = {};
  for (const campo of permitidos) {
    if (origen?.[campo] !== undefined) {
      resultado[campo] = origen[campo];
    }
  }
  return resultado;
}

/** Nombres de los campos de auditoría, iguales a los del resto del crud. */
export const MARCAS_DE_TIEMPO = {
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_modificacion',
} as const;
