<script setup>

defineProps({
  name: String,
  course: String,
})

</script>

<template>
  <h2>{{ name }}</h2>
  <h3>{{ course }}</h3>
</template>

<style scoped lang="less">
  
</style>
