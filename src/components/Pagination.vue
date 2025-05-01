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
  position: absolute; /* Cambio a posicionamiento absoluto */
  bottom: 0; /* Lo anclo a la parte inferior del contenedor */
  left: 0;
  right: 0;
  margin: 0; /* Elimino márgenes */
  padding: 30px 0;
  z-index: 10; /* Mantengo z-index alto para asegurar que esté por encima del grid */
  background: linear-gradient(to top, rgba(233, 236, 239, 1) 60%, rgba(233, 236, 239, 0)); /* Añado gradiente para mejor visibilidad */
}

/* Agrupo los números de página con un espaciado consistente */
.page-numbers {
  display: flex;
  gap: 10px;
}

/* Estilo base para los botones de navegación y números de página */
.page-btn,
.page-number {
  padding: 10px 18px;
  border: none;
  border-radius: 8px; /* Aumento el border-radius para mejor apariencia */
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Aumento la sombra para mejor visibilidad */
  position: relative;
  z-index: 11; /* Incremento el z-index para asegurar que esté por encima del fondo de la paginación */
}

/* Deshabilito visualmente los botones cuando no son utilizables */
.page-btn:disabled {
  background: #eee;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Mantengo un tamaño consistente para los botones de número */
.page-number {
  min-width: 44px; /* Aumento ligeramente el tamaño */
  height: 44px; /* Aumento ligeramente el tamaño */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500; /* Añado un poco de peso a la fuente */
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