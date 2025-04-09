<template>
  <div class="show-card" :style="{ borderLeftColor: show.color }">
    <button class="delete-btn" @click="$emit('deleteShow', show.id)">×</button>
    
    <div class="show-content">
      <div class="show-image">
        <img :src="show.image" :alt="show.title" />
      </div>
      
      <div class="show-details">
        <h3>{{ show.title }}</h3>
        <p class="description">{{ show.description }}</p>
        <p class="year" v-if="show.releaseDate">{{ show.releaseDate }}</p>
        
        <div class="tags" v-if="show.tags && show.tags.length">
          <span 
            v-for="(tag, index) in show.tags" 
            :key="index" 
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        
        <p class="notes" v-if="show.notes"><strong>Note:</strong> {{ show.notes }}</p>
        
        <div class="rating">
          <span 
            v-for="star in 5" 
            :key="star" 
            :class="['star', { filled: star <= Math.floor(show.rating) }]"
          >
            ★
          </span>
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
      required: true,
      validator: function(obj) {
        return [
          'id', 
          'title', 
          'description', 
          'image', 
          'rating', 
          'tags', 
          'notes', 
          'color', 
          'releaseDate'
        ].every(prop => prop in obj);
      }
    }
  },
  emits: ['deleteShow']
};
</script> 