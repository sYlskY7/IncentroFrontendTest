# 🚀 Incentro CX - Prueba Técnica Frontend 2025

Este proyecto es la implementación de la **Prueba Técnica Frontend 2025** para Incentro CX España.  
Se ha desarrollado en **Angular 18.2.14 + TailwindCSS 3**, siguiendo buenas prácticas de componentización y organización del código.

---

## 📂 Estructura principal

src/
├── app/
│   ├── core/          # Servicios y modelos globales (ej: OpenLibraryService)
│   ├── features/      # Features principales (books, payments, etc.)
│   │   ├── components/ # Componentes de cada feature
│   │   └── pages/      # Páginas con routing
│   └── shared/        # Componentes reutilizables (credit-card, balance, etc.)
└── assets/            # Recursos estáticos

---

## ⚙️ Instalación y uso

# Clonar el repositorio
git clone https://github.com/tuusuario/IncentroFrontendTest.git

# Entrar al proyecto
cd IncentroFrontendTest

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run start

El servidor arrancará en http://localhost:4200/ 

## 🛠️ Tecnologías utilizadas
- **Angular 18.2.14**
- **TailwindCSS 3**
- **TypeScript**
- **RxJS**
- **API pública OpenLibrary**

---

## 🌐 API utilizada

Se consume la API pública de **OpenLibrary**:

- **Búsqueda de libros**:  
  `https://openlibrary.org/search.json?q=harry+potter`

- **Detalle de un libro (work)**:  
  `https://openlibrary.org/works/OL82563W.json`

- **Ediciones de un libro**:  
  `https://openlibrary.org/works/OL82563W/editions.json?limit=3`

---

## ✨ Funcionalidades clave
- **Dashboard principal** con tarjeta, balance, pagos recientes y buscador.
- **Tarjeta de crédito** con animación 3D (flip) y ocultar/mostrar número.
- **Pagos recientes** con scroll e iconos por tipo.
- **Balance** con fecha actual y cantidad centrada.
- **Búsqueda de libros** y navegación dinámica a la página de detalle.
- **Página de detalle** con portada, descripción, ediciones y metadatos.
