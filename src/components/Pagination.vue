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

<script setup>
// Define props and emits
const props = defineProps({
  // Need to know the current page to highlight it and handle prev/next buttons
  currentPage: {
    type: Number,
    required: true
  },
  // Use total number of pages to generate numeric buttons
  totalPages: {
    type: Number,
    required: true
  }
});

// Emit event when user changes page
defineEmits(['update:currentPage']);
</script>

<style scoped>
/* Center pagination and distribute elements evenly */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: fit-content;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

/* Group page numbers with consistent spacing */
.page-numbers {
  display: flex;
  gap: 10px;
}

/* Base style for navigation buttons and page numbers */
.page-btn,
.page-number {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Visually disable buttons when not usable */
.page-btn:disabled {
  background: #eee;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Keep consistent size for number buttons */
.page-number {
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

/* Highlight current page with primary color */
.page-number.active {
  background: #4662f8;
  color: white;
  box-shadow: 0 2px 8px rgba(70, 98, 248, 0.3);
}

/* Add hover effect to improve interactivity */
.page-btn:hover:not(:disabled),
.page-number:hover:not(.active) {
  background: #e9ecef;
  transform: translateY(-2px);
}
</style> 