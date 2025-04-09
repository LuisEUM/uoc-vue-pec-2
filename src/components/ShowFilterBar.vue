<template>
  <div class="filter-bar">
    <div class="search-row">
      <input 
        type="text" 
        v-model="searchTerm"
        placeholder="Search shows..."
        class="search-input"
      />
      <div class="button-group">
        <button @click="$emit('clearFilters')" class="clear-btn">Clear</button>
        <button @click="$emit('addShowRequest')" class="add-btn">Add new show</button>
      </div>
    </div>
    
    <div class="filters-row">
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