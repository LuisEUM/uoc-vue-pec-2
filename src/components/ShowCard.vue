<template>
  <!-- Esta es mi tarjeta de show, personalizo el color del borde superior según el show -->
  <div class="show-card" :style="{ borderTopColor: show.color || '#42b983' }">
    <!-- Botón de eliminar que solo se muestra si la prop deletable es true -->
    <button
      v-if="deletable"
      @click="$emit('deleteShow', show.id)"
      class="delete-btn"
    >
      <img src="/src/assets/delete.svg" alt="Delete" class="delete-icon" />
    </button>
    <!-- Contenido principal de la tarjeta con evento click para seleccionar -->
    <div class="show-content" @click="$emit('select', show)">
      <!-- Contenedor para la imagen con tamaño fijo -->
      <div class="show-image-container">
        <img :src="show.image" :alt="show.title" class="show-image" />
      </div>
      <!-- Detalles del show con layout en columna -->
      <div class="show-details">
        <h3>{{ show.title }}</h3>
        <p class="description">{{ show.description }}</p>
        <p class="year" v-if="show.year">{{ show.year }}</p>
        <!-- Tags del show con v-if para asegurarme que existan -->
        <div class="tags" v-if="show.tags && show.tags.length">
          <span v-for="tag in show.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <p class="notes" v-if="show.notes">{{ show.notes }}</p>
        <!-- Sistema de rating con estrellas usando un truco de CSS -->
        <div class="rating">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ filled: i <= show.rating }"
            >★</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Defino las props que recibe mi componente
const props = defineProps({
  // El objeto completo del show con todos sus datos
  show: {
    type: Object,
    required: true, // Siempre necesito un show para renderizar
  },
  // Controla si se muestra el botón de eliminar
  // Por defecto no lo muestro para reutilizar el componente en modo "solo lectura"
  deletable: {
    type: Boolean,
    default: false,
  },
});

// Defino los eventos que puede emitir mi componente
// Me gusta mantener la comunicación con componentes padre mediante eventos
defineEmits(['deleteShow', 'select']);
</script>

<style scoped>
/* Diseño de tarjeta con borde superior personalizable para cada show */
.show-card {
  background: white;
  border-radius: 8px;
  overflow: hidden; /* Para que las imágenes no se salgan */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  border-top: 5px solid; /* El color lo especifico con style binding */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  height: 100%;
  flex-direction: row;
  min-height: 100%;
}

/* Efecto de elevación al pasar el mouse para mejor UX */
.show-card:hover {
  transform: translateY(-5px); /* Se eleva ligeramente */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada */
}

/* Botón de eliminar en la esquina superior derecha */
.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Para que quede encima del contenido */
  padding: 0;
}

/* Tamaño del icono de eliminar */
.delete-icon {
  width: 44px;
  height: 44px;
}

/* Layout horizontal para el contenido */
.show-content {
  display: flex;
  width: 100%;
  height: 100%;
}

/* Ancho fijo para el contenedor de imagen */
.show-image-container {
  width: 120px;
  height: auto;
  flex-shrink: 0; /* Evito que se encoja con el contenido */
  overflow: hidden;
  position: relative;
  background-color: #000; /* Fondo negro en caso de imágenes transparentes */
}

/* Me aseguro que la imagen cubra bien el espacio asignado */
.show-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Recorta la imagen para que cubra todo el contenedor */
  object-position: center;
  min-height: 100%;
}

/* Organizo los detalles en una columna flexible */
.show-details {
  padding: 15px;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Estilo el título para que destaque */
.show-details h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Trunco el texto con ... si es muy largo */
  color: #2c3e50;
}

/* Limito la descripción a tres líneas con elipsis */
.description {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Máximo 3 líneas */
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* Estilo sutil para el año de lanzamiento */
.year {
  font-size: 0.85em;
  color: #888;
  margin-bottom: 8px;
}

/* Organizo los tags en un contenedor flexible */
.tags {
  display: flex;
  flex-wrap: wrap; /* Para que salten a la siguiente línea si no caben */
  gap: 5px;
  margin-bottom: 10px;
}

/* Diseño cada tag como una pequeña píldora */
.tag {
  background: #f5f5f5;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  color: #666;
}

/* Empujo las estrellas al final de la tarjeta con margin-top: auto */
.rating {
  margin-bottom: 10px;
  margin-top: auto; /* Esto las coloca siempre al final */
  display: flex;
}

/* Estrellas grises por defecto */
.star {
  color: #ddd;
  font-size: 18px;
}

/* Estrellas doradas para la puntuación */
.star.filled {
  color: gold;
}

/* Estilo las notas como texto más pequeño en cursiva */
.notes {
  font-size: 0.85em;
  color: #666;
  font-style: italic;
  margin: 5px 0;
  display: -webkit-box;
  line-clamp: 2; /* Propiedad estándar */
  -webkit-line-clamp: 2; /* Propiedad específica para webkit */
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* Ajusto la altura mínima en dispositivos móviles */
@media (max-width: 768px) {
  .show-card {
    min-height: 250px;
  }
}
</style>
