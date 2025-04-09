<template>
  <div class="grid-container">
    <div class="card-board">
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
          <p class="year" v-if="show.releaseDate">{{ show.releaseDate }}</p>
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
              :class="['star', { filled: star <= Math.floor(show.rating) }]"
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

<script>
import Pagination from './Pagination.vue';

export default {
  name: 'CardBoard',
  components: {
    Pagination
  },
  props: {
    showList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6 // 2 filas x 3 columnas
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.showList.length / this.itemsPerPage);
    },
    paginatedShows() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.showList.slice(start, end);
    }
  },
  watch: {
    'showList.length': function() {
      this.currentPage = 1;
    }
  },
  emits: ['deleteShow']
}
</script>