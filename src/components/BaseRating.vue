<template>
  <div class="rating">
    <span v-for="n in 5" :key="n" :class="{ 'filled': n <= stars }">★</span>
  </div>
</template>

<script>
export default {
  name: 'BaseRating',
  props: {
    rating: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 5,
    }
  },
  computed: {
    stars() {
      return Math.round(this.rating);
    }
  }
}
</script> 