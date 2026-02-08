VIDEO EXPLICATIVO:
https://youtu.be/t0OVXONUbdE


React: CatFlix 🎬🐱

Descripción General

Este repositorio contiene el desarrollo de una aplicación CatFlix, un clon temático de Netflix orientado a películas y directores, construido con React, Material UI y consumo de APIs REST en Django.Incluye autenticación, CRUD de películas y directores, y un diseño inspirado en la estética oscura de Netflix.

Fase 1: Layout inicial con React y Material UI

Objetivo

Construir el layout base de CatFlix con React y Material UI, incluyendo:

Header con navegación.

Página de inicio con secciones de películas y directores.

Componentes reutilizables para tarjetas.

Requisitos previos

Node.js y npm instalados

Editor de código (VS Code recomendado)

Navegador actualizado (Chrome recomendado)

React con Vite

Requisitos técnicos

Material UI (@mui/material, @emotion/react, @emotion/styled)

Estilos personalizados con CSS

Estructura inicial

/src
  /components
    Header.jsx
    PeliculaCard.jsx
    DirectorCard.jsx
  /pages
    Home.jsx
    LoginPage.jsx
  main.jsx

Fase 2: Consumo de API REST con Axios

Objetivo

Integrar llamadas a la API REST generada en Django para obtener datos reales de películas y directores.

Requisitos técnicos

Axios para peticiones HTTP

Variables de entorno (.env) para configurar URLs de API

Servicios reutilizables (peliculaServices.js, directorServices.js, authServices.js)

Nuevas características

Consumo de endpoints /api/peliculas/ y /api/directores/

Servicios centralizados para CRUD

Manejo de imágenes desde el backend

Estructura actualizada

/src
  /components
    Header.jsx
    PeliculaCard.jsx
    DirectorCard.jsx
  /pages
    Home.jsx
    LoginPage.jsx
  /services
    peliculaServices.js
    directorServices.js
    authServices.js
  .env
  main.jsx

Variables de entorno (.env)

VITE_API_BASE_URL=http://localhost:8000
VITE_API_MEDIA_URL=${VITE_API_BASE_URL}/media/

Fase 3: Autenticación y Autorización

Objetivo

Implementar login, logout y protección de rutas con React Router y tokens de acceso.

Requisitos técnicos

Autenticación con Django (OAuth o JWT)

Tokens almacenados en localStorage

Interceptores de Axios para autorización

Rutas protegidas con React Router

Nuevas características

Página de login (/login)

Botones de logout en el header

Rutas protegidas para agregar películas y directores

Íconos de edición y eliminación en tarjetas (solo si el usuario está logueado)

Instalación del proyecto

Clonar el repositorio

git clone <url-del-repo>
cd catflix

Instalar dependencias base

npm install

Instalar Material UI y dependencias

npm install @mui/material @emotion/react @emotion/styled

Instalar Axios y React Router

npm install axios react-router-dom

Instalar íconos de Material UI (versión 5.x)

npm install @mui/icons-material@5.15.15

Comandos útiles

Ejecutar servidor de desarrollo:

npm run dev

Verificar dependencias:

npm list

Limpiar dependencias:

rm -rf node_modules
npm install

Comandos Git

Verificar archivos modificados:

git status

Agregar cambios:

git add .

Commit:

git commit -m "CatFlix: actualización de componentes y servicios"

Push:

git push