<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
  name: String,
  course: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="less">
@dark-bg: #c6c6c6;
@text-color: #ffffff;
@accent-color: #42b883;

.read-the-docs {
  color: @text-color;
}

.card {
  background-color: @dark-bg;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  button {
    background-color: @accent-color;
    color: @text-color;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.9;
    }
  }
}

h1 {
  color: @accent-color;
}
</style>
