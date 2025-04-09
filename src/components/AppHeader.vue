<template>
  <header class="app-header">
    <div class="logo">
      <img src="../assets/uoc-logo.png" alt="UOC Logo" class="logo-img">
      <h1>TV Show Manager: {{ userName }}</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    userName: {
      type: String,
      required: true
    }
  }
}
</script> 