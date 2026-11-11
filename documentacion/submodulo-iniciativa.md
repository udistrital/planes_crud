# Submódulos de las iniciativas de inversión (`submodulo-iniciativa`) y estados de submódulo (`estado-submodulo`)

Las usa el mid (`/v1/iniciativa-inversion`) para las iniciativas de inversión formuladas con plantillas de Construcción. No se modificó ninguna colección existente.

## `submodulo_iniciativa`

Hay un documento por iniciativa y submódulo (índice único `plan_id + submodulo`).

| Campo | Tipo | Descripción |
|---|---|---|
| `plan_id` | string | Id del plan de la iniciativa |
| `submodulo` | string | Clave del submódulo en la plantilla (`nombre`, `problematica`…) |
| `estado_submodulo_id` | string | Id en `estado_submodulo` |
| `dato` | objeto (Mixed) | JSON legible con las claves de la plantilla; se guarda como objeto, no como texto |
| `observaciones` | `[{ _id, texto, rol, usuario, fecha }]` | Historial de comentarios sobre el submódulo completo, en orden de registro. Solo se agregan; no se reemplazan ni se borran (ver abajo) |
| `version` | number | Aumenta en cada actualización de `dato`, estado o `activo` (bloqueo optimista). Agregar una observación no la cambia |
| `activo` | boolean | Borrado lógico |
| `fecha_creacion`, `fecha_modificacion` | Date | Automáticas (`timestamps`) |

| Endpoint | Qué hace |
|---|---|
| `POST /submodulo-iniciativa` | Crea un submódulo |
| `POST /submodulo-iniciativa/lote` | Crea todos los submódulos de una iniciativa en una llamada |
| `GET /submodulo-iniciativa?query=plan_id:<id>,activo:true` | Lista (filtros genéricos del crud) |
| `GET /submodulo-iniciativa/:id` | Obtiene una |
| `PUT /submodulo-iniciativa/:id` | Actualiza `dato`, `estado_submodulo_id` o `activo`. **Exige `version`**. No acepta `observaciones` |
| `POST /submodulo-iniciativa/:id/observaciones` | Agrega una observación al historial. Cuerpo: `{ texto, rol, usuario, estado_submodulo_id? }`. Responde 201 con el submódulo |

**Bloqueo optimista del `PUT`:**
- La condición `{ _id, version }` y el incremento `$inc: { version: 1 }` van en la misma operación atómica.
- Si otra persona cambió el submódulo desde que se consultó, responde **409** sin sobrescribir.
- Si el submódulo no existe, responde 404.

**Observaciones (`POST :id/observaciones`):**
- Se agregan con `$push`, en una sola operación atómica, y **no cambian `version`**. Así un comentario no choca con quien está editando los datos del submódulo.
- Cada observación es sobre el submódulo completo. Solo se guardan `texto`, `rol`, `usuario` y `fecha`; cualquier otro campo del cuerpo se ignora.
- `rol` es el rol con el que se escribió (p. ej. `PLANEACION`, `JEFE_DEPENDENCIA`) y `usuario`, el documento de quien escribe. Ambos son obligatorios.
- `fecha` la pone el servidor y cada observación recibe su propio `_id`.
- `texto` es obligatorio y admite hasta 4.000 caracteres.
- Si se envía `estado_submodulo_id`, el estado cambia en la misma operación. El mid lo usa para dejar el submódulo "Con observaciones" cuando comenta Planeación.
- Las observaciones guardadas antes de que se retiraran `lado` y `ruta` pueden conservarlos; `database local/construccion-proyecto-inversion/limpiar-observaciones.js` los quita.
- **Quién puede comentar y cuándo lo decide el mid**, no el crud.

## `estado_submodulo`

Catálogo de estados de submódulo con el color del semáforo: `nombre`, `descripcion`, `codigo_abreviacion` (único), `color` (`#RRGGBB`) y `activo`.

- **Endpoints:** `POST`, `GET` (con filtros), `GET /:id` y `PUT /:id`.
- **Siembra:** los registros iniciales se crean con `database local/construccion-proyecto-inversion/cargar-estados.js`.

## Diferencias con los módulos antiguos (solo en estos módulos)

- **Códigos HTTP reales.** Responden el código HTTP real con el mismo sobre `{ Success, Status, Message, Data }`. Lo hace `src/comun/respuesta-excepcion.filter.ts`, aplicado con `@UseFilters` solo en estos controladores.
- **Errores lanzados, no devueltos.** Los servicios lanzan excepciones de Nest en lugar de devolver el error.
- **Campos permitidos.** Solo se copian los campos permitidos de cada DTO (`src/comun/campos.ts`); `_id`, fechas y `version` no se pueden enviar.

## Pruebas

```bash
npx jest submodulo-iniciativa
```
