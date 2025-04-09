<template>
  <div class="filter-bar">
    <input type="text" placeholder="Search..." v-model="searchQuery" />
    <select v-model="selectedTag">
      <option value="">All Tags</option>
      <option value="Drama">Drama</option>
      <option value="Comedy">Comedy</option>
      <option value="Action">Action</option>
      <option value="Sci-Fi">Sci-Fi</option>
    </select>
    <input type="range" min="0" max="5" step="0.1" v-model="minRating" />
    <select v-model="sortBy">
      <option value="name">Name</option>
      <option value="releaseDate">Release Date</option>
      <option value="rating">Rating</option>
    </select>
    <select v-model="order">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <button @click="clearFilters">Clear</button>
    <button @click="toggleForm">Add new show</button>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  data() {
    return {
      searchQuery: '',
      selectedTag: '',
      minRating: 0,
      sortBy: 'name',
      order: 'asc'
    };
  },
  methods: {
    clearFilters() {
      this.searchQuery = '';
      this.selectedTag = '';
      this.minRating = 0;
      this.sortBy = 'name';
      this.order = 'asc';
    },
    toggleForm() {
      this.$emit('toggle-form');
    }
  }
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin-bottom: 20px;
}
input[type="text"] {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
select, input[type="range"] {
  margin: 0 10px;
}
button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style> 