<template>
  <div class="show-card">
    <button class="delete-btn" @click="$emit('delete', show.id)">×</button>
    
    <div class="show-content">
      <div class="show-image">
        <img :src="show.image" :alt="show.title" />
      </div>
      
      <div class="show-details">
        <h3>{{ show.title }}</h3>
        <p class="description">{{ show.description }}</p>
        <p class="year">{{ show.year }}</p>
        
        <div class="tags">
          <span 
            v-for="(tag, index) in show.tags" 
            :key="index" 
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
        
        <p class="notes"><strong>Note:</strong> {{ show.notes }}</p>
        
        <div class="rating">
          <span 
            v-for="star in 5" 
            :key="star" 
            :class="['star', { filled: star <= Math.round(show.rating) }]"
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
      required: true
    }
  }
};
</script>

<style scoped>
.show-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  z-index: 10;
}

.show-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.show-image {
  height: 200px;
  overflow: hidden;
}

.show-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show-details {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
}

.description {
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}

.year {
  color: #777;
  font-size: 14px;
  margin-bottom: 10px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 15px;
}

.tag {
  background-color: #f0f0f0;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #555;
}

.notes {
  font-size: 13px;
  font-style: italic;
  color: #666;
  margin-bottom: 10px;
  flex-grow: 1;
}

.rating {
  display: flex;
  margin-top: auto;
}

.star {
  color: #ddd;
  font-size: 18px;
}

.star.filled {
  color: gold;
}
</style> 