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
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

defineEmits(['update:currentPage']);
</script> 