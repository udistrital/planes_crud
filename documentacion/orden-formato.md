# Orden de los elementos del formato

## Persistencia sin campo `orden`

El orden de los hijos de un subgrupo se representa mediante la posición de sus
IDs en el arreglo `hijos` que ya existe en el documento padre. No se agregaron
campos ni colecciones MongoDB.

Los hijos directos de un plan no tienen un arreglo padre donde persistir una
posición. `GET /subgrupo/hijos/{planId}` los entrega por
`fecha_creacion` ascendente y `_id` ascendente. No debe modificarse
`fecha_creacion` para simular un orden, porque es información de auditoría.

## Reordenar con el endpoint existente

Se reutiliza:

```http
PUT /subgrupo/{idPadre}
Content-Type: application/json
```

El body reducido contiene la colección completa de hijos, en el orden esperado:

```json
{
  "hijos": [
    "ID_ACTIVIDAD",
    "ID_FECHA_INICIO",
    "ID_FECHA_FINALIZACION"
  ]
}
```

Cuando el body contiene `hijos`, el endpoint entra exclusivamente en el flujo de
reordenamiento y no modifica nombre, descripción, estado ni padre. Valida que:

1. La lista exista y no esté vacía.
2. No haya identificadores repetidos.
3. Todos los identificadores existan como hijos del subgrupo de la URL.
4. Se envíe la colección completa de hermanos.

El reemplazo del arreglo es una única operación atómica sobre el documento
padre. La actualización incluye como condición el valor anterior de `hijos`;
si otra petición lo cambió concurrentemente, responde HTTP 409 sin sobrescribirla.

Errores:

- 400: lista vacía, duplicada o incompleta.
- 404: subgrupo padre inexistente.
- 409: nodo de otro padre o modificación concurrente.
- 500: error interno.

## Datos históricos

No se requiere migración de schema. Para normalizar un subgrupo existente:

1. Consultar `GET /subgrupo/hijos/{idPadre}`.
2. Presentar al usuario esa lista. Los IDs ya incluidos en `padre.hijos` aparecen
   primero en el orden histórico; referencias faltantes se agregan de forma
   determinista por `fecha_creacion`, `_id`.
3. Enviar todos los IDs mediante `PUT /subgrupo/{idPadre}` en el orden aprobado.

Esta primera escritura elimina de hecho huecos conceptuales: el índice del ID
es su posición (`0..n-1`). Las referencias duplicadas, inexistentes o de otro
padre no pueden guardarse mediante el flujo de reordenamiento.

## Creación e inactivación

`POST /subgrupo/registrar_nodo` mantiene el comportamiento existente de agregar
el nuevo ID al final de `padre.hijos`. La inactivación no elimina ni mueve el ID,
por lo que una reactivación recupera su posición previa. Para insertar o mover
en una posición intermedia se crea el nodo y luego se envía el arreglo completo
al PUT del padre.
