<template>
  <div class="card-board">
    <ShowCard v-for="show in showList" :key="show.id" :show="show" />
  </div>
</template>

<script>
import ShowCard from './ShowCard.vue';

export default {
  name: "CardBoard",
  components: {
    ShowCard
  },
  props: {
    showList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.card-board {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style> 