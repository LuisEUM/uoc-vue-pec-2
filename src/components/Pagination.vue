<template>
  <!-- Mi componente de paginación con botones de navegación y números de página -->
  <div class="pagination">
    <!-- Botón para ir a la página anterior, deshabilitado si estamos en la primera página -->
    <button 
      class="page-btn" 
      :disabled="currentPage === 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      Previous
    </button>
    
    <!-- Números de página, con la página actual resaltada -->
    <div class="page-numbers">
      <button 
        v-for="page in totalPages" 
        :key="page"
        :class="['page-number', { active: page === currentPage }]"
        @click="$emit('update:currentPage', page)"
      >
        {{ page }}
      </button>
    </div>
    
    <!-- Botón para ir a la página siguiente, deshabilitado si estamos en la última página -->
    <button 
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
// Defino las props que necesito para controlar la paginación
const props = defineProps({
  // Necesito saber la página actual para resaltarla y manejar los botones prev/next
  currentPage: {
    type: Number,
    required: true
  },
  // Uso el número total de páginas para generar los botones numéricos
  totalPages: {
    type: Number,
    required: true
  }
});

// Emito un evento cuando el usuario cambia de página
// Uso v-model:currentPage en el componente padre, así que necesito update:currentPage
defineEmits(['update:currentPage']);
</script>

<style scoped>
/* Centro la paginación y distribuyo los elementos uniformemente */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: fit-content;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil para elevación */
  margin: 0 auto;
}

/* Agrupo los números de página con espaciado consistente */
.page-numbers {
  display: flex;
  gap: 10px;
}

/* Estilo base para botones de navegación y números de página */
.page-btn,
.page-number {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #f8f9fa; /* Gris muy claro, casi blanco */
  cursor: pointer;
  transition: all 0.2s; /* Animación suave al hacer hover */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Deshabilito visualmente los botones cuando no son utilizables */
.page-btn:disabled {
  background: #eee;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Mantengo un tamaño consistente para los botones numéricos */
.page-number {
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

/* Resalto la página actual con el color primario */
.page-number.active {
  background: #4662f8; /* Azul como color principal */
  color: white;
  box-shadow: 0 2px 8px rgba(70, 98, 248, 0.3); /* Sombra del mismo color */
}

/* Añado efecto hover para mejorar la interactividad */
.page-btn:hover:not(:disabled),
.page-number:hover:not(.active) {
  background: #e9ecef; /* Un poco más oscuro al pasar el ratón */
  transform: translateY(-2px); /* Ligero efecto de elevación */
}
</style> 