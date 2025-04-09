<template>
  <header class="app-header">
    <div class="logo">
      <img src="../assets/uoc-logo.png" alt="UOC Logo" class="logo-img">
      <h1>TV Show Manager: {{ userName }}</h1>
    </div>
  </header>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.app-header {
  background-color: transparent;
  color: #979797;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  height: 60px;
  width: auto;
}

h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 600;
}
</style> 