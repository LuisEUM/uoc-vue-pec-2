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
          <p class="year">{{ show.year }}</p>
          <div class="tags">
            <span v-for="tag in show.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="rating">
            <span 
              v-for="star in 5" 
              :key="star"
              :class="['star', { filled: star <= Math.round(show.rating) }]"
            >★</span>
          </div>
          <p v-if="show.notes" class="notes">
            <strong>Notes:</strong> {{ show.notes }}
          </p>
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
import { ref, computed } from 'vue';
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

defineEmits(['deleteShow']);
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 80dvh;
  flex: 1;
  width: 100%;
}

.show-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  flex-grow: 1;
  min-height: 75dvh;
  width: 100%;
}

.show-grid:empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  color: #666;
  text-align: center;
}

.show-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  border-top: 5px solid;
  transition: transform 0.2s ease-in-out;
  display: flex;
  height: 100%;
  min-height: 350px;
}

.show-card:hover {
  transform: translateY(-5px);
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.show-image-container {
  width: 220px;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}

.show-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.show-details {
  padding: 20px;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0 0 15px;
  font-size: 1.4em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2c3e50;
}

.description {
  font-size: 1.1em;
  color: #666;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.year {
  font-size: 1em;
  color: #888;
  margin-bottom: 15px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.tag {
  background: #f5f5f5;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.95em;
  color: #666;
}

.rating {
  margin-bottom: 15px;
  margin-top: auto;
}

.star {
  color: #ddd;
  font-size: 22px;
}

.star.filled {
  color: gold;
}

.notes {
  font-size: 1em;
  color: #666;
  font-style: italic;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

@media (max-width: 1200px) {
  .show-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .show-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
}
</style> 