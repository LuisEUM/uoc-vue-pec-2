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

    <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
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
  height: 100%;
  min-height: 80dvh;
  flex: 1;
  width: 100%;
  position: relative;
  padding-bottom: 80px;
}

.card-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px;
  padding: 20px;
  width: 100%;
  padding-bottom: 60px;
}

.card-board:empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  color: #666;
  text-align: center;
}

@media (max-width: 1200px) {
  .card-board {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
  }
}

@media (max-width: 768px) {
  .card-board {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
  }
}
</style>
