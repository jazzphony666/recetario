# Recetario Digital

Aplicación web para gestionar y compartir recetas de cocina.

## Características

- Crear, editar y eliminar recetas
- Lista de ingredientes y pasos de preparación
- Categorización de recetas
- Interfaz intuitiva y responsive

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- Angular CLI

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/recetario-digital.git
cd recetario-digital
```

2. Instalar dependencias del backend:
```bash
cd backend
npm install
```

3. Instalar dependencias del frontend:
```bash
cd ../frontend
npm install
```

## Configuración

1. Crear archivo `.env` en la carpeta `backend`:
```
MONGODB_URI=mongodb://localhost:27017/recetario
PORT=3000
```

## Ejecución

1. Iniciar el backend:
```bash
cd backend
node app.js
```

2. Iniciar el frontend:
```bash
cd frontend
ng serve
```

La aplicación estará disponible en:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

## Tecnologías Utilizadas

- Frontend:
  - Angular
  - Bootstrap
  - TypeScript

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Estructura del Proyecto

```
recetario-digital/
├── backend/           # API REST
│   ├── models/       # Modelos de MongoDB
│   ├── routes/       # Rutas de la API
│   └── app.js        # Punto de entrada
│
└── frontend/         # Aplicación Angular
    ├── src/
    │   ├── app/     # Componentes y servicios
    │   └── assets/  # Recursos estáticos
    └── ...
```

## Licencia

MIT 