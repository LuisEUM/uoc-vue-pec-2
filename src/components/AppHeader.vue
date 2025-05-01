<template>
  <header class="app-header">
    <div class="logo">
      <img src="../assets/logo.png" alt="UOC Logo" class="logo-img" />
      <h1>TV Show Manager: {{ userName }}</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    // Recibo el nombre del usuario para mostrarlo en el encabezado
    userName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Uso colores transparentes para el encabezado para mantener un diseño limpio */
.app-header {
  background-color: transparent;
  color: #979797;
  padding: 15px 20px;
  margin-bottom: 20px;
}

/* Organizo el logo y el título en línea con flex */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Mantengo el logo en un tamaño adecuado */
.logo-img {
  height: 60px;
  width: auto;
}

/* Doy estilo al título para que destaque pero sin ser demasiado invasivo */
h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 600;
}
</style>
