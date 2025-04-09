<template>
  <div class="filter-bar">
    <div class="search-section">
      <input 
        type="text" 
        v-model="searchTerm"
        placeholder="Search shows..."
        class="search-input"
      />
      <button @click="$emit('clearFilters')" class="clear-btn">Clear</button>
      <button @click="$emit('addShowRequest')" class="add-btn">Add new show</button>
    </div>
    
    <div class="filters-section">
      <div class="filter-group">
        <label>Tag:</label>
        <select v-model="selectedTag">
          <option value="">All</option>
          <option v-for="tag in tagOptions" :key="tag" :value="tag">
            {{ tag }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Min Rating:</label>
        <input 
          type="range" 
          v-model.number="minRating"
          min="0"
          max="5"
          step="0.5"
        />
        <span>{{ minRating }}</span>
      </div>
      
      <div class="filter-group">
        <label>Sort by:</label>
        <select v-model="sortBy">
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Order:</label>
        <select v-model="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  tagOptions: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'clearFilters', 'addShowRequest']);

const searchTerm = computed({
  get: () => props.modelValue.searchTerm,
  set: (value) => emit('update:modelValue', { ...props.modelValue, searchTerm: value })
});

const selectedTag = computed({
  get: () => props.modelValue.tag,
  set: (value) => emit('update:modelValue', { ...props.modelValue, tag: value })
});

const minRating = computed({
  get: () => props.modelValue.minRating,
  set: (value) => emit('update:modelValue', { ...props.modelValue, minRating: value })
});

const sortBy = computed({
  get: () => props.modelValue.sortBy,
  set: (value) => emit('update:modelValue', { ...props.modelValue, sortBy: value })
});

const sortOrder = computed({
  get: () => props.modelValue.sortOrder,
  set: (value) => emit('update:modelValue', { ...props.modelValue, sortOrder: value })
});
</script>

<style scoped>
.filter-bar {
  background-color: #333;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  color: white;
}

.search-section {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.clear-btn {
  padding: 8px 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  padding: 8px 15px;
  background-color: #4662f8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.filters-section {
  display: flex;
  gap: 20px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group select,
.filter-group input[type="range"] {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.filter-group input[type="range"] {
  width: 100px;
}
</style> 