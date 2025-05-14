<template>
  <!-- Contenedor principal para mi grid de tarjetas y paginación -->
  <div class="grid-container">
    <!-- Aquí muestro todas las tarjetas en un grid responsive -->
    <div class="card-board">
      <ShowCard
        v-for="show in paginatedShows"
        :key="show.id"
        :show="show"
        :deletable="true"
        @deleteShow="$emit('deleteShow', show.id)"
      />
    </div>

    <!-- Contenedor para la paginación en la parte inferior -->
    <div class="pagination-container">
      <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Pagination from "./Pagination.vue";
import ShowCard from "./ShowCard.vue";

// Defino las props que recibe mi componente
const props = defineProps({
  showList: {
    type: Array,
    required: true, // La lista de shows es obligatoria
  },
});

// Defino los eventos que emite mi componente
const emit = defineEmits(['deleteShow']);

// Estado reactivo que controla la paginación
const currentPage = ref(1); // Empiezo en la página 1
const itemsPerPage = 6; // Uso 6 elementos por página para un grid de 2x3

// Propiedades computadas que dependen del estado reactivo
const totalPages = computed(() => {
  // Calculo cuántas páginas necesito según la cantidad de shows
  return Math.ceil(props.showList.length / itemsPerPage);
});

const paginatedShows = computed(() => {
  // Calculo qué shows mostrar en la página actual
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.showList.slice(start, end);
});

// Observo cambios en la lista de shows
watch(
  () => props.showList.length,
  () => {
    // Si cambia el número de shows (por filtrado o eliminación),
    // vuelvo a la primera página para evitar páginas vacías
    currentPage.value = 1;
  }
);
</script>

<style scoped>
/* Contenedor principal con altura mínima para que no se vea muy pequeño */
.grid-container {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  width: 100%;
  position: relative;
  padding-bottom: 30px;
  margin-bottom: 20px;
}

/* Grid de tarjetas con 3 columnas por defecto */
.card-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas de igual tamaño */
  grid-auto-rows: minmax(320px, auto); /* Altura mínima para las filas */
  gap: 25px; /* Espacio entre tarjetas */
  padding: 20px;
  width: 100%;
}

/* Estilo para cuando no hay tarjetas que mostrar */
.card-board:empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  color: #666;
  text-align: center;
  height: 300px;
}

/* Contenedor de paginación alineado al centro */
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-top: auto; /* Empuja la paginación al fondo */
}

/* Media queries para hacer el grid responsive */
@media (max-width: 1200px) {
  .card-board {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablets */
    grid-auto-rows: minmax(300px, auto);
  }
}

@media (max-width: 768px) {
  .card-board {
    grid-template-columns: 1fr; /* 1 columna en móviles */
    grid-auto-rows: minmax(280px, auto);
  }
}
</style>
