# planes_crud
Repositorio para el api CRUD para el manejo de planes del sistema de planeación de la universidad Distrital

## Especificaciones Técnicas
### Tecnologías Implementadas y Versiones
- NestJS
- MongoDB

### Variables de Entorno
```
USER: process.env.PLANES_CRUD_USER,
PASS: process.env.PLANES_CRUD_PASS,
HOST: process.env.PLANES_CRUD_HOST,
PORT: process.env.PLANES_CRUD_PORT,
DB: process.env.PLANES_CRUD_DB,
HTTP_PORT: process.env.PLANES_CRUD_HTTP_PORT,
AUTH_DB: process.env.PLANES_CRUD_AUTH_DB 
```
**Nota:** Las variables se pueden encontrar en el fichero src/config/configuration.ts

### Ejecución del Proyecto 

```
# 1. Obtener el repositorio de git
git clone https://github.com/udistrital/planes_crud.git

# 2. Moverse a la carpeta del repositorio 
cd planes_crud

# 3. Moverse a la rama **develop**
git pull origin develop && git checkout develop

# 4. Instalar dependencias
npm install 

# 5. Alimentar todas las variables de entorno que utiliza el pryecto.
PLANES_CRUD_HTTP_PORT=8080... 

```
### Ejecución Pruebas 
Pruebas unitarias

```
En proceso
```
## Estado CI

| Develop | Relese 0.0.1 | Master |
| -- | -- | -- |
| [![Build Status]()]() | [![Build Status]()]() | [![Build Status]()]() |



### Modelo de Datos

[Modelo de datos]()

### Licencia

This file is part of sintomas_crud.

planes_crud is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

planes_crud is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with sintomas_crud. If not, see https://www.gnu.org/licenses/.
