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

<script>
import Pagination from "./Pagination.vue";
import ShowCard from "./ShowCard.vue";

export default {
  name: "CardBoard",
  components: {
    Pagination,
    ShowCard,
  },
  props: {
    showList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6, // 2 filas x 3 columnas
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
    },
  },
  watch: {
    "showList.length": function () {
      this.currentPage = 1;
    },
  },
  emits: ["deleteShow"],
};
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

.card-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  flex-grow: 1;
  min-height: 75dvh;
  width: 100%;
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
    grid-template-rows: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .card-board {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
}
</style>
