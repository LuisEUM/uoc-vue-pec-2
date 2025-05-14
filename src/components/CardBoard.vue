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

    <div class="pagination-container">
      <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Pagination from "./Pagination.vue";
import ShowCard from "./ShowCard.vue";

// Define props and emits
const props = defineProps({
  showList: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['deleteShow']);

// Reactive state
const currentPage = ref(1);
const itemsPerPage = 6; // Use 6 items to display in a 2x3 grid

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(props.showList.length / itemsPerPage);
});

const paginatedShows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.showList.slice(start, end);
});

// Watchers
watch(
  () => props.showList.length,
  () => {
    currentPage.value = 1;
  }
);
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  width: 100%;
  position: relative;
  padding-bottom: 30px;
  margin-bottom: 20px;
}

.card-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(320px, auto);
  gap: 25px;
  padding: 20px;
  width: 100%;
}

.card-board:empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  color: #666;
  text-align: center;
  height: 300px;
}

.pagination-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-top: auto;
}

@media (max-width: 1200px) {
  .card-board {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(300px, auto);
  }
}

@media (max-width: 768px) {
  .card-board {
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(280px, auto);
  }
}
</style>
