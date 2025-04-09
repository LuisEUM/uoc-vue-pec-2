<template>
  <div class="grid-container">
    <div class="show-grid">
      <div 
        v-for="show in paginatedShows" 
        :key="show.id" 
        class="show-card"
        :style="{ borderTopColor: show.color }"
      >
        <button class="delete-btn" @click="$emit('deleteShow', show.id)">×</button>
        <div class="show-image-container">
          <img :src="show.image" :alt="show.title" class="show-image">
        </div>
        <div class="show-details">
          <h3>{{ show.title }}</h3>
          <p class="description">{{ show.description }}</p>
          <p class="year" v-if="show.year">{{ show.year }}</p>
          <div class="tags" v-if="show.tags && show.tags.length">
            <span v-for="tag in show.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <p v-if="show.notes" class="notes">
            <strong>Note:</strong> {{ show.notes }}
          </p>
          <div class="rating">
            <span 
              v-for="star in 5" 
              :key="star"
              :class="['star', { filled: star <= Math.round(show.rating) }]"
            >★</span>
          </div>
        </div>
      </div>
    </div>
    
    <Pagination
      v-model:currentPage="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Pagination from './Pagination.vue';

const props = defineProps({
  shows: {
    type: Array,
    required: true
  }
});

const currentPage = ref(1);
const itemsPerPage = 6; // 2 filas x 3 columnas

const totalPages = computed(() => Math.ceil(props.shows.length / itemsPerPage));

const paginatedShows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.shows.slice(start, end);
});

// Reset to page 1 when shows change
watch(() => props.shows.length, () => {
  currentPage.value = 1;
});

defineEmits(['deleteShow']);
</script> 