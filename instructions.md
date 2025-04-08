# Programación Web Avanzada

## PEC 2: Componentización

Esta PEC abordará la creación de los componentes fundamentales del caso de estudio, y la comprensión del funcionamiento de propiedades, parámetros, y división de elementos en componentes.

### Conocimientos, Habilidades y Competencias

En esta PEC se desarrollan los siguientes conocimientos (K), habilidades (S) y Competencias (C) del Grado en Multimedia 2023:

- **K1.** Identificar y diferenciar los elementos de la teoría de la multimedia para analizar, conceptualizar y diseñar productos interactivos multimedia.
- **S3.** Utilizar de manera adecuada los lenguajes de programación, las herramientas de desarrollo y las tecnologías disponibles para el análisis, el diseño y la implementación de aplicaciones multimedia.
- **S7.** Analizar y sintetizar información para evaluar soluciones tecnológicas y elaborar propuestas de proyectos multimedia teniendo en cuenta los recursos, las alternativas disponibles y las condiciones de mercado.

### Objetivos

Los objetivos específicos de esta PEC son:

- Familiarizarse con el funcionamiento de Vue.js.
- Conocer conceptos básicos de componentes en Vue.

### Recursos de lectura

Tal y como hicimos en la PEC anterior, a continuación os indicamos los recursos de lectura que consideramos importantes que reviséis y estudiéis para realizar esta PEC. También os indicamos las secciones (o capítulos concretos) que deberíais leer con atención para la correcta ejecución de esta PEC.

👁 El concepto de componente no se crea en el ámbito Web, sino que ha existido en el área de ingeniería del software desde hace tiempo. En uno de los libros de referencia sobre desarrollo de software orientado a objetos, titulado "Object-oriented Software Construction", escrito por Bertrand Meyer y publicado en 1988; ya se introducía este concepto.

📕 **Libro:** Azaustre Rodríguez, C. Conceptos y técnicas avanzadas de programación web. FUOC, 2024

**2. El concepto de componente**

- Proceso de registro de componentes y su ciclo de vida
- Capítulo 2.5: Crear componentes en frameworks populares (Vue, React, Angular, Svelte)

**8.1.1. Single-file components**
Ejemplo de cómo crear un componente de archivo único en Vue.

💻 **Vue docs**
[Essentials](https://vuejs.org/guide/essentials/application.html)
Especial atención a:

- Template Syntax
- Reactivity Fundamentals
- Component Basics

💡 Vue 3 cuenta con dos tipos de API: Options API y Composition API. En esta PEC haremos uso de la **Options API**.

### Formato de envío

- Archivo zip con el contenido de la carpeta src del proyecto
- Archivo PDF con las respuestas a las preguntas formuladas
- El documento PDF debe incluir el nombre del estudiante en el encabezado

### Puntuación (10 puntos totales)

- Preguntas: máximo 2 puntos
- Desarrollo de componentes: máximo 8 puntos
  - Creación correcta de componentes y estructura de archivos (20%)
  - Creación correcta de parámetros/datos (20%)
  - Creación correcta de plantillas y estilos CSS (20%)
  - Color personalizado para cada tarjeta vinculado a los datos (10%)
  - Casos de ejemplo con datos de prueba (20%)
  - Calidad general del código (10%)

### Ejercicios

#### Ejercicio 1 (0,5 puntos)

Crear componente ProductCard con:

**Props requeridos:**

- title: String
- price: Number
- inStock: Boolean

**Data:**

- quantity: number (valor inicial: 0)
- shipping: array con:
  ```javascript
  [
    { id: 1, cost: 3.95, days: 3, country: "Germany", freeShippingItems: 10 },
    { id: 2, cost: 0.5, days: 15, country: "China", freeShippingItems: 5 },
  ];
  ```
- selectedShipping: Object (valor inicial: {})

**Template:**

```html
<h2>{{ title }}</h2>
<p>Price: ${{ price }}</p>
```

#### Ejercicio 2 (0,25 puntos)

Añadir método increaseQuantity que incremente quantity en 1 si hay valores en shipping. Añadir botón "Add to cart" que llame a esta función.

#### Ejercicio 3 (0,25 puntos)

Mostrar texto cuando no hay stock:

```html
<small>Out of stock</small>
```

#### Ejercicio 4 (0,5 puntos)

Añadir propiedad disabled al botón "Add to cart" si no hay valores en Shipping o no hay stock.

#### Ejercicio 5 (0,5 puntos)

Mostrar mensaje indicando cuántos items faltan para envío gratuito.

### Caso de Estudio: TV Show Manager

#### Imagen de Referencia

![TV Show Manager Interface](Homepage.png)

La imagen proporcionada muestra el diseño final que debe tener la aplicación. En ella se pueden observar:

1. **Cabecera**:

   - Logo UOC
   - Título "TV Show Manager: My name"

2. **Barra de Filtros (FilterBar)**:

   - Campo de búsqueda con botón "Clear"
   - Selector de etiquetas (Tag: Drama)
   - Control deslizante para rating mínimo
   - Opciones de ordenación (Sort by: Name)
   - Selector de orden (Order: Ascending)
   - Botón "Add new show"

3. **Panel Principal (CardBoard)**:
   Muestra 5 series de ejemplo:

   - Breaking Bad (2008)
   - Stranger Things (2016)
   - The Walking Dead (2010)
   - Game of Thrones (2011)
   - American Horror Story (2011)

   Cada tarjeta incluye:

   - Imagen de la serie
   - Título
   - Descripción breve
   - Año de estreno
   - Etiquetas
   - Sistema de rating con estrellas
   - Notas adicionales
   - Borde de color personalizado

4. **Formulario Lateral (CardForm)**:
   Panel derecho con campos para añadir nueva serie:
   - Title
   - Description
   - Image URL
   - Rating
   - Tags
   - Notes
   - Color
   - Botón "Add show"

#### Componentes Principales

##### ShowCard.vue

Componente que muestra información de una serie. Recibe objeto con:

- id: ID (int)
- title: Nombre
- description: Descripción
- image: URL de imagen
- rating: Float (0-5)
- tags: Array de strings
- notes: String
- color: String (hexadecimal)
- releaseDate: String

Características:

- Borde de color dinámico según parámetro "color"
- Sistema de 5 estrellas (★) para rating

##### CardBoard.vue

Muestra lista de ShowCard.vue. Recibe:

- showList: Array de items

##### FilterBar.vue

Componente de búsqueda y filtrado con:

- Barra de búsqueda
- Selector de etiquetas
- Rating (rango 0-5)
- Sort by (nombre, fecha, valoración)
- Order (ascendente/descendente)
- Botón "Add new show"

##### CardForm.vue

Formulario para crear nuevas series (funcionalidad futura)

- Botón para ocultar/mostrar formulario

##### App.vue

Componente principal:

- Cabecera con logo y título "TV Show Manager" + nombre y apellido
- Integra FilterBar, CardBoard y CardForm
- Datos de prueba para 5 series
- Layout según captura de pantalla

### Notas Importantes

- Usar datos de prueba coherentes
- No es necesario implementar lógica de negocio completa
- Seguir estructura visual de la captura de pantalla
- Estilos proporcionados en materiales

### Contacto

En caso de que tengáis que consultar algo mediante el foro o por correo electrónico:

- Copiad vuestro código a una plataforma online y enviad el link para evitar problemas con el correo de la UOC
- Plataformas recomendadas:
  - **Codepen** (para sencillos snippets de código)
  - **CodeSandBox** (para ejercicios más complejos)

**Nota:** En caso de publicar algún código en el foro, deberán ser consultas genéricas y no directamente soluciones a los ejercicios. Hacer accesible soluciones de ejercicios a otros compañeros se considerará copia y se penalizará académicamente a nivel de asignatura.

### Propiedad intelectual y plagio

La Normativa académica de la UOC dispone que el proceso de evaluación se cimenta en el trabajo personal del estudiante y presupone la autenticidad de la autoría y la originalidad de los ejercicios realizados.

En esta PEC no está permitido el uso de herramientas de Inteligencia Artificial.

Encontrarás más información sobre las faltas y las consecuencias del plagio en:

- El plan de estudios
- La web sobre integridad académica y plagio de la UOC
- [Cómo citar](https://biblioteca.uoc.edu/es/pagina/Como-citar/)

El estudiante será calificado con un suspenso (D/0) si se detecta falta de originalidad en la autoría de alguna prueba de evaluación continua (PEC) o final (PEF), sea porque:

- Haya utilizado material o dispositivos no autorizados
- Haya copiado textualmente de internet
- Haya copiado de PEC, apuntes, materiales, manuales o artículos sin la cita correspondiente
- Haya copiado de otro estudiante
- Cualquier otra conducta irregular

### Diseño y Estilos

- La aplicación debe seguir el diseño mostrado en la captura de pantalla proporcionada
- Los estilos están disponibles en los materiales del curso
- El diseño debe ser implementado para escritorio (no es necesario que sea responsivo)
- Se proporcionan iconos e imágenes en la carpeta "assets"

### Estructura de Archivos

La estructura de archivos recomendada es:

```
src/
├── components/
│   ├── ShowCard.vue
│   ├── CardBoard.vue
│   ├── FilterBar.vue
│   └── CardForm.vue
├── assets/
│   └── [imágenes e iconos]
├── styles/
│   ├── globalStyles.css
│   └── [otros archivos CSS]
└── App.vue
```
