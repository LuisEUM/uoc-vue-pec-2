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