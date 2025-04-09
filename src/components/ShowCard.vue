<template>
  <div class="show-card" :style="{ borderTopColor: show.color || '#42b983' }">
    <button v-if="deletable" @click="$emit('deleteShow', show.id)" class="delete-btn">
      <img src="/src/assets/delete.svg" alt="Delete" class="delete-icon">
    </button>
    <div class="show-content" @click="$emit('select', show)">
      <div class="show-image-container">
        <img :src="show.image" :alt="show.title" class="show-image">
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
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= show.rating }">★</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowCard',
  props: {
    show: {
      type: Object,
      required: true
    },
    deletable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['deleteShow', 'select']
}
</script>

<style scoped>
@import "../styles/components/ShowCard.css";
</style> 