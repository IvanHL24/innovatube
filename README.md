# Innovatube
Aplicación web para búsqueda y gestión de videos favoritos de Youtube.

## Tecnologias utilizadas
### Frontend
- Angular 19
- TypeScript
- Angular Material
- RxJS

### Backend
- Node.js
- Express
- MySQL

### Despliegue
- **Frontend:** Vercel
- **Backend:** Railway
- **Base de datos:** Railway/MySQL

## Funcionalidades
- Registro de usuarios
- Inicio y cierre de sesión
- Autenticacion de usuarios
- Validación y seguridad de formularios mediante reCAPTCHA
- Protección de rutas con Guards
- Consulta y redirección a videos mediante servicios de terceros
- Consumo de API REST
- Persistencia de usuarios y datos en MySQL

## Estructura del proyecto
```text
innovatube/
|-- frontend/
|    -- ...
|-- backend/
|    -- ...
|-- database/
|    -- database.sql
|-- .gitignore
|-- README.md
```


## Requisitos

Para ejecutar el proyecto localmente se requiere:
- Node.js
- npm
- Angular CLI
- MySQL

## Instalación

1. **Clonar el repositorio**

git clone URL_DEL_REPOSITORIO
cd innovatube

2. **Base de datos**

Crear una base de datos MySQL e importar el archivo: database/dabase.sql
Este archivo contiene la estructura necesaria para ejecutar el proyecto.

3. **Backend**

Entrar a la carpeta del backend:
cd backend

Instalar las dependencias:
npm install

Configurar las variables de entorno necesarias para la conexión con MySQL, puedes utilizar la plantilla .env.example.

Iniciar el servidor:
npm run dev

4. **Frontend**

Entrar a la carpeta del frontend:
cd frontend

Instalar las dependencias:
npm install

Iniciar Angular:
ng serve

La aplicación estará disponible normalmente en:
http://localhost:4200

## Variables de entorno

Para ejecutar el backend localmente se deben configurar las variables de entorno correspondientes a la conexión con MySQL.

## Aplicación desplegada

**Frontend**: https://innovatube-blond.vercel.app/

**Backend**: https://innovatube-production-b155.up.railway.app/

## Base de datos

El proyecto incluye el archivo:
database/database.sql

Este archvo permite crear la estructura de la base de datos necesaria para ejecutar la aplicación.

## Notas

El frontend y backend se encuentran desplegados de forma independiente.
El frontend consume los endpoints proporcionados por el backend mediante una API REST.