# Catálogos de SISGPLAN (`elemento-catalogo`)

La colección general de catálogos: **todos los catálogos en una sola colección**, `elemento_catalogo` (un documento por elemento). Hoy la usan las iniciativas de inversión: procesos, sectores, programas, productos, regiones, departamentos, municipios, riesgos, etc. Por ahora se cargan los de Identificación y Preparación. El campo `catalogo` dice a cuál pertenece cada elemento.

Se eligió una sola colección porque todos los catálogos tienen la misma forma (código, nombre y padre). Así, un catálogo nuevo no necesita un módulo nuevo: basta con cargar sus elementos. Es el mismo modelo de Parámetros (OAS), así que pasarlos allá después es directo.

Los catálogos de **estados y tipos** (`estado-plan`, `estado-submodulo`, `tipo-plan`…) **no van aquí**. Tienen campos propios (como el color), se referencian por `_id` y el código depende de sus valores.

## `elemento_catalogo`

| Campo | Tipo | Descripción |
|---|---|---|
| `catalogo` | string | Catálogo al que pertenece (`programas_pnd`, `municipios`…). Solo minúsculas, números y `_` |
| `codigo` | string | Único dentro del catálogo. **Es lo que guardan los documentos que lo usan** |
| `nombre` | string | Lo que se muestra |
| `padre` | string | Código del elemento del que depende, en otro catálogo (programa → sector, municipio → departamento). Vacío si no depende de nada |
| `orden` | number | Orden de presentación |
| `activo` | boolean | Borrado lógico. Un elemento que sale del catálogo se desactiva, no se borra, para no romper los documentos que lo usan |
| `fecha_creacion`, `fecha_modificacion` | Date | Automáticas (`timestamps`) |

**Índices:** único `{ catalogo, codigo }` y `{ catalogo, padre }`.

## Endpoints

| Endpoint | Qué hace |
|---|---|
| `GET /elemento-catalogo?query=catalogo:programas_pnd,activo:true&sortby=orden` | Un catálogo completo (filtros genéricos del crud; sin `limit` trae todo) |
| `GET /elemento-catalogo?query=catalogo:municipios,padre:Cundinamarca,activo:true` | Los hijos de un elemento |
| `GET /elemento-catalogo/:id` | Un elemento |
| `POST /elemento-catalogo` | Crea un elemento. 409 si el código ya existe en ese catálogo |
| `POST /elemento-catalogo/lote` | Crea o actualiza hasta 1.000 elementos por `catalogo + codigo` en una sola operación (no duplica). Responde `{ recibidos, creados, actualizados, sin_cambios }` |
| `PUT /elemento-catalogo/:id` | Cambia `nombre`, `padre`, `orden` o `activo`. `catalogo` y `codigo` no cambian |

Como `estado-submodulo` y `submodulo-iniciativa`, responde con el código HTTP real y el sobre `{ Success, Status, Message, Data }`.

## Carga

Los catálogos se extraen del instrumento de formulación (Anexo 1) y se cargan con los scripts de `database local/`:

```bash
node catalogos/extraer-catalogos.js                                  # Excel -> catalogos/*.json
node construccion-proyecto-inversion/cargar-catalogos.js --ejecutar  # catalogos/*.json -> /elemento-catalogo
```

`cargar-catalogos.js` compara con lo que ya hay: crea lo nuevo, actualiza lo cambiado y desactiva lo que ya no está en el archivo. Envía lotes de menos de 100 KB, que es el límite del cuerpo de las peticiones del crud.

## Pruebas

```bash
npx jest elemento-catalogo
```
