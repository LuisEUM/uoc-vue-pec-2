<template>
  <div class="filter-bar">
    <div class="search-row">
      <input
        type="text"
        :value="modelValue.searchTerm"
        @input="updateFilter('searchTerm', $event.target.value)"
        placeholder="Search shows..."
        class="search-input"
      />
      <div class="button-group">
        <button @click="$emit('clearFilters')" class="clear-btn">Clear</button>
        <button @click="$emit('addShowRequest')" class="add-btn">
          Add new show
        </button>
      </div>
    </div>

    <div class="filters-row">
      <div class="filter-group">
        <label>Tag:</label>
        <select
          :value="modelValue.tag"
          @change="updateFilter('tag', $event.target.value)"
        >
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
          :value="modelValue.minRating"
          @input="updateRating($event)"
          min="0"
          max="5"
          step="0.5"
          ref="ratingSlider"
        />
        <span>{{ modelValue.minRating }}</span>
      </div>

      <div class="filter-group">
        <label>Sort by:</label>
        <select
          :value="modelValue.sortBy"
          @change="updateFilter('sortBy', $event.target.value)"
        >
          <option value="title">Title</option>
          <option value="releaseDate">Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Order:</label>
        <select
          :value="modelValue.sortOrder"
          @change="updateFilter('sortOrder', $event.target.value)"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// Define props and emits
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  tagOptions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'clearFilters', 'addShowRequest']);

// Refs
const ratingSlider = ref(null);

// Methods
const updateFilter = (key, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  });
};

const updateRating = (event) => {
  // Update the rating value
  const value = parseFloat(event.target.value);
  updateFilter('minRating', value);

  // Update the visual progress of the slider
  updateRangeProgress(event);
};

const updateRangeProgress = (event) => {
  const target = event.target;
  const min = parseFloat(target.min);
  const max = parseFloat(target.max);
  const val = parseFloat(target.value);
  const percentage = ((val - min) * 100) / (max - min);
  target.style.setProperty('--range-progress', `${percentage}%`);
};

// Lifecycle hooks
onMounted(() => {
  if (ratingSlider.value) {
    const slider = ratingSlider.value;
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(props.modelValue.minRating);
    const percentage = ((val - min) * 100) / (max - min);
    slider.style.setProperty('--range-progress', `${percentage}%`);
  }
});
</script>

<style scoped>
.filter-bar {
  background-color: #333;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-row {
  display: flex;
  width: 100%;
  gap: 15px;
  align-items: center;
  height: 36px;
}

.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
  width: 100%;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  height: 36px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 15px;
  white-space: nowrap;
  height: 100%;
}

.clear-btn {
  padding: 8px 16px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  height: 36px;
  font-size: 14px;
}

.clear-btn:hover {
  background-color: #f0f0f0;
}

.add-btn {
  padding: 8px 16px;
  background-color: #4662f8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  height: 36px;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #354dd8;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.filter-group label {
  font-weight: bold;
}

.filter-group select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
}

.filter-group input[type="range"] {
  width: 100px;
  background-color: transparent;
  accent-color: #999;
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  height: 20px;
  border: none;
  outline: none;
  padding: 0;
}

/* Remove focus styles for a cleaner design */
.filter-group input[type="range"]:focus {
  outline: none;
  box-shadow: none;
  border: none;
}

/* Custom styles for the slider control */
.filter-group input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    #999 var(--range-progress, 0%),
    #ffffff var(--range-progress, 0%)
  );
  border: none;
}

.filter-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: #999;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  margin-top: -5px; /* Adjust thumb to center it on the track */
  cursor: pointer;
}

.filter-group input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #ffffff;
}

.filter-group input[type="range"]::-moz-range-progress {
  height: 4px;
  border-radius: 2px;
  background-color: #999;
}

.filter-group input[type="range"]::-moz-range-thumb {
  appearance: none;
  background-color: #999;
  height: 14px;
  width: 14px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
    align-items: stretch;
    height: auto;
  }

  .search-input {
    width: 100%;
    height: 42px;
  }

  .button-group {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
    height: 42px;
  }

  .filters-row {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
  }

  .filter-group {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
