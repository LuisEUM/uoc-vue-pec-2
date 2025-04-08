<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Info from './components/info.vue'
import ProductCard from './components/ProductCard.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue"  />
  <Info name="Luis Eduardo Urdaneta Martucci" course="Programación Web Avanzada" />
  
  <h2>Ejercicios PEC 2</h2>
  <div class="products-container">
    <ProductCard 
      title="Laptop" 
      :price="999.99" 
      :inStock="true" 
    />
    <ProductCard 
      title="Smartphone" 
      :price="499.99" 
      :inStock="false" 
    />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.products-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
