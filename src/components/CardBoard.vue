<template>
  <div class="grid-container">
    <div class="card-board">
      <ShowCard 
        v-for="show in paginatedShows" 
        :key="show.id" 
        :show="show"
        :deletable="true"
        @deleteShow="$emit('deleteShow', show.id)"
      />
    </div>
    
    <Pagination
      v-model:currentPage="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<script>
import Pagination from './Pagination.vue';
import ShowCard from './ShowCard.vue';

export default {
  name: 'CardBoard',
  components: {
    Pagination,
    ShowCard
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