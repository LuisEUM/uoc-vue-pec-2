<template>
  <div class="pagination">
    <button 
      class="page-btn" 
      :disabled="currentPage === 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      Previous
    </button>
    
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
    
    <button 
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // Necesito saber la página actual para destacarla y manejar los botones prev/next
    currentPage: {
      type: Number,
      required: true
    },
    // Utilizo el número total de páginas para generar los botones numéricos
    totalPages: {
      type: Number,
      required: true
    }
  },
  // Emito el evento cuando el usuario cambia de página
  emits: ['update:currentPage']
}
</script>

<style scoped>
/* Centro la paginación y distribuyo los elementos uniformemente */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  flex: 1;
  min-width: 0;
}

/* Agrupo los números de página con un espaciado consistente */
.page-numbers {
  display: flex;
  gap: 10px;
}

/* Estilo base para los botones de navegación y números de página */
.page-btn,
.page-number {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

/* Deshabilito visualmente los botones cuando no son utilizables */
.page-btn:disabled {
  background: #eee;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Mantengo un tamaño consistente para los botones de número */
.page-number {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Destaco la página actual con color primario */
.page-number.active {
  background: #4662f8;
  color: white;
}

/* Añado efecto hover para mejorar la interactividad */
.page-btn:hover:not(:disabled),
.page-number:hover:not(.active) {
  background: #f0f0f0;
}
</style> 