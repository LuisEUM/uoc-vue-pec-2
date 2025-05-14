<template>
  <header class="app-header">
    <div class="logo">
      <img src="../assets/logo.png" alt="UOC Logo" class="logo-img" />
      <h1>TV Show Manager: {{ userName }}</h1>
    </div>
  </header>
</template>

<script setup>
// Define props
defineProps({
  // Receive username to display in the header
  userName: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Use transparent colors for the header to maintain a clean design */
.app-header {
  background-color: transparent;
  color: #979797;
  padding: 15px 20px;
  margin-bottom: 20px;
}

/* Organize logo and title inline with flex */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Keep logo at an appropriate size */
.logo-img {
  height: 60px;
  width: auto;
}

/* Style the title to stand out without being too invasive */
h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 600;
}
</style>
