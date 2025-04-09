<template>
  <div class="rating">
    <span v-for="n in 5" :key="n" :class="{ 'filled': n <= stars }">★</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  rating: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 5,
  }
});

const stars = computed(() => Math.round(props.rating));
</script>

<style scoped>
.rating span {
  color: #ccc;
  cursor: default;
  font-size: 1.2em;
}
.rating span.filled {
  color: #f8d347;
}
</style> 