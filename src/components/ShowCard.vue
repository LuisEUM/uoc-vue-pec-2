<template>
  <div class="show-card" :style="{ borderTopColor: show.color || '#42b983' }">
    <button
      v-if="deletable"
      @click="$emit('deleteShow', show.id)"
      class="delete-btn"
    >
      <img src="/src/assets/delete.svg" alt="Delete" class="delete-icon" />
    </button>
    <div class="show-content" @click="$emit('select', show)">
      <div class="show-image-container">
        <img :src="show.image" :alt="show.title" class="show-image" />
      </div>
      <div class="show-details">
        <h3>{{ show.title }}</h3>
        <p class="description">{{ show.description }}</p>
        <p class="year" v-if="show.year">{{ show.year }}</p>
        <div class="tags" v-if="show.tags && show.tags.length">
          <span v-for="tag in show.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <p class="notes" v-if="show.notes">{{ show.notes }}</p>
        <div class="rating">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ filled: i <= show.rating }"
            >★</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowCard",
  props: {
    show: {
      type: Object,
      required: true,
    },
    deletable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["deleteShow", "select"],
};
</script>

<style scoped>
.show-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  border-top: 5px solid;
  transition: transform 0.2s ease-in-out;
  display: flex;
  height: 100%;
  min-height: 350px;
  flex-direction: row;
}

.show-card:hover {
  transform: translateY(-5px);
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 0;
}

.delete-icon {
  width: 44px;
  height: 44px;
}

.show-content {
  display: flex;
  width: 100%;
  height: 100%;
}

.show-image-container {
  width: 120px;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  background-color: #000;
}

.show-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.show-details {
  padding: 15px;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.show-details h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2c3e50;
}

.description {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.year {
  font-size: 0.85em;
  color: #888;
  margin-bottom: 8px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.tag {
  background: #f5f5f5;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  color: #666;
}

.rating {
  margin-bottom: 10px;
  margin-top: auto;
  display: flex;
}

.star {
  color: #ddd;
  font-size: 18px;
}

.star.filled {
  color: gold;
}

.notes {
  font-size: 0.85em;
  color: #666;
  font-style: italic;
  margin: 5px 0;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .show-card {
    min-height: 250px;
  }
}
</style>
