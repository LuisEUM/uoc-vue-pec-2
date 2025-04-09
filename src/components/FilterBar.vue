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
          <option value="releaseDate">Year</option>
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

<script>
export default {
  name: 'FilterBar',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    tagOptions: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modelValue', 'clearFilters', 'addShowRequest'],
  computed: {
    searchTerm: {
      get() {
        return this.modelValue.searchTerm;
      },
      set(value) {
        this.$emit('update:modelValue', { ...this.modelValue, searchTerm: value });
      }
    },
    selectedTag: {
      get() {
        return this.modelValue.tag;
      },
      set(value) {
        this.$emit('update:modelValue', { ...this.modelValue, tag: value });
      }
    },
    minRating: {
      get() {
        return this.modelValue.minRating;
      },
      set(value) {
        this.$emit('update:modelValue', { ...this.modelValue, minRating: value });
      }
    },
    sortBy: {
      get() {
        return this.modelValue.sortBy;
      },
      set(value) {
        this.$emit('update:modelValue', { ...this.modelValue, sortBy: value });
      }
    },
    sortOrder: {
      get() {
        return this.modelValue.sortOrder;
      },
      set(value) {
        this.$emit('update:modelValue', { ...this.modelValue, sortOrder: value });
      }
    }
  }
}
</script> 