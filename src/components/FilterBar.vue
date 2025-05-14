<template>
  <!-- Mi barra de filtros completa con búsqueda y filtros específicos -->
  <div class="filter-bar">
    <!-- Fila superior con buscador y botones de acción -->
    <div class="search-row">
      <input
        type="text"
        :value="modelValue.searchTerm"
        @input="updateFilter('searchTerm', $event.target.value)"
        placeholder="Search shows..."
        class="search-input"
      />
      <div class="button-group">
        <button @click="$emit('clearFilters')" class="clear-btn">Clear</button>
        <button @click="$emit('addShowRequest')" class="add-btn">
          Add new show
        </button>
      </div>
    </div>

    <!-- Fila inferior con todos los filtros disponibles -->
    <div class="filters-row">
      <!-- Filtro por tag/categoría -->
      <div class="filter-group">
        <label>Tag:</label>
        <select
          :value="modelValue.tag"
          @change="updateFilter('tag', $event.target.value)"
        >
          <option value="">All</option>
          <option v-for="tag in tagOptions" :key="tag" :value="tag">
            {{ tag }}
          </option>
        </select>
      </div>

      <!-- Filtro por puntuación mínima con slider -->
      <div class="filter-group">
        <label>Min Rating:</label>
        <input
          type="range"
          :value="modelValue.minRating"
          @input="updateRating($event)"
          min="0"
          max="5"
          step="0.5"
          ref="ratingSlider"
        />
        <span>{{ modelValue.minRating }}</span>
      </div>

      <!-- Selector de campo para ordenar -->
      <div class="filter-group">
        <label>Sort by:</label>
        <select
          :value="modelValue.sortBy"
          @change="updateFilter('sortBy', $event.target.value)"
        >
          <option value="title">Title</option>
          <option value="releaseDate">Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <!-- Selector de dirección de ordenamiento -->
      <div class="filter-group">
        <label>Order:</label>
        <select
          :value="modelValue.sortOrder"
          @change="updateFilter('sortOrder', $event.target.value)"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// Defino las props que recibe mi componente
const props = defineProps({
  // Uso v-model en el padre, así que necesito modelValue
  modelValue: {
    type: Object,
    required: true, // Contiene todos los filtros aplicados actualmente
  },
  // Opciones de tags disponibles para el selector
  tagOptions: {
    type: Array,
    required: true, // Me vienen desde el padre, basados en los shows existentes
  },
});

// Defino los eventos que emite mi componente
const emit = defineEmits(['update:modelValue', 'clearFilters', 'addShowRequest']);

// Referencias para manipular el DOM directamente
const ratingSlider = ref(null);

// Métodos para actualizar los filtros
const updateFilter = (key, value) => {
  // Emito el evento para actualizar el v-model en el padre
  // Uso la sintaxis de spread para mantener los demás valores
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  });
};

const updateRating = (event) => {
  // Actualizo el valor del rating
  const value = parseFloat(event.target.value);
  updateFilter('minRating', value);

  // Actualizo visualmente el progreso del slider
  updateRangeProgress(event);
};

// Este método actualiza el aspecto visual del slider
const updateRangeProgress = (event) => {
  const target = event.target;
  const min = parseFloat(target.min);
  const max = parseFloat(target.max);
  const val = parseFloat(target.value);
  
  // Calculo el porcentaje de avance para el gradiente del slider
  const percentage = ((val - min) * 100) / (max - min);
  
  // Establezco la variable CSS para el gradiente
  target.style.setProperty('--range-progress', `${percentage}%`);
};

// Ciclo de vida del componente
onMounted(() => {
  // Al montar el componente, actualizo el aspecto visual del slider
  // según el valor inicial
  if (ratingSlider.value) {
    const slider = ratingSlider.value;
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(props.modelValue.minRating);
    const percentage = ((val - min) * 100) / (max - min);
    slider.style.setProperty('--range-progress', `${percentage}%`);
  }
});
</script>

<style scoped>
/* Barra de filtros con un color oscuro para contraste */
.filter-bar {
  background-color: #333;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Fila de búsqueda con layout flexible */
.search-row {
  display: flex;
  width: 100%;
  gap: 15px;
  align-items: center;
  height: 36px;
}

/* Fila de filtros con wrapping para responsividad */
.filters-row {
  display: flex;
  flex-wrap: wrap; /* Permite que los filtros salten de línea en pantallas pequeñas */
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
  width: 100%;
}

/* Campo de búsqueda con flex-grow para ocupar espacio disponible */
.search-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  height: 36px;
  box-sizing: border-box;
}

/* Grupo de botones alineados horizontalmente */
.button-group {
  display: flex;
  gap: 15px;
  white-space: nowrap; /* Evita que los textos se rompan */
  height: 100%;
}

/* Botón de limpiar con estilo neutro */
.clear-btn {
  padding: 8px 16px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  height: 36px;
  font-size: 14px;
}

/* Efecto hover para el botón de limpiar */
.clear-btn:hover {
  background-color: #f0f0f0;
}

/* Botón de añadir con color destacado */
.add-btn {
  padding: 8px 16px;
  background-color: #4662f8; /* Color principal de la app */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  height: 36px;
  font-size: 14px;
}

/* Efecto hover para el botón de añadir */
.add-btn:hover {
  background-color: #354dd8; /* Un poco más oscuro al hacer hover */
}

/* Grupo de filtros con alineación centrada */
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap; /* Mantengo las etiquetas junto a los inputs */
}

/* Etiquetas de filtros en negrita para destacar */
.filter-group label {
  font-weight: bold;
}

/* Selectores con estilo consistente */
.filter-group select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
}

/* Slider personalizado para el rating */
.filter-group input[type="range"] {
  width: 100px;
  background-color: transparent;
  accent-color: #999; /* Para navegadores que soportan esta propiedad */
  -webkit-appearance: none; /* Elimino el estilo nativo */
  appearance: none;
  margin: 0;
  height: 20px;
  border: none;
  outline: none;
  padding: 0;
}

/* Elimino estilos de focus para un diseño más limpio */
.filter-group input[type="range"]:focus {
  outline: none;
  box-shadow: none;
  border: none;
}

/* Estilos personalizados para el slider */
.filter-group input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  /* Uso un gradiente que avanza según el valor seleccionado */
  background: linear-gradient(
    to right,
    #999 var(--range-progress, 0%),
    #ffffff var(--range-progress, 0%)
  );
  border: none;
}

/* Diseño del "thumb" (control deslizante) para webkit */
.filter-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: #999;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  margin-top: -5px; /* Ajusto el thumb para centrarlo en la pista */
  cursor: pointer;
}

/* Soporte para Firefox - pista del slider */
.filter-group input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #ffffff;
}

/* Soporte para Firefox - progreso del slider */
.filter-group input[type="range"]::-moz-range-progress {
  height: 4px;
  border-radius: 2px;
  background-color: #999;
}

/* Soporte para Firefox - thumb del slider */
.filter-group input[type="range"]::-moz-range-thumb {
  appearance: none;
  background-color: #999;
  height: 14px;
  width: 14px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

/* Media queries para dispositivos móviles */
@media (max-width: 768px) {
  /* Cambio la dirección de fila a columna para la búsqueda */
  .search-row {
    flex-direction: column;
    align-items: stretch;
    height: auto;
  }

  /* Ajusto el ancho del input para móviles */
  .search-input {
    width: 100%;
    height: 42px; /* Un poco más grande para facilitar el tap */
  }

  /* Ajusto el grupo de botones para móviles */
  .button-group {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between; /* Distribuyo los botones */
    height: 42px;
  }

  /* Cambio la dirección a columna para los filtros */
  .filters-row {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
  }

  /* Cada grupo de filtros ocupa el ancho completo */
  .filter-group {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
