<template>
  <!-- Este es mi encabezado de la aplicación, lo mantengo simple pero profesional -->
  <header class="app-header">
    <div class="logo">
      <!-- Uso el logo de la UOC para darle un toque académico -->
      <img src="../assets/logo.png" alt="UOC Logo" class="logo-img" />
      <!-- Muestro mi nombre como parte del título para personalizar la app -->
      <h1>TV Show Manager: {{ userName }}</h1>
    </div>
  </header>
</template>

<script setup>
// Defino las props que recibe mi componente
defineProps({
  // Recibo el nombre de usuario para mostrarlo en el encabezado
  // Me gusta personalizar la aplicación con el nombre del usuario
  userName: {
    type: String,
    required: true, // Es obligatorio para que siempre se vea mi nombre
  },
});
</script>

<style scoped>
/* Uso colores transparentes para que el encabezado no compita con el contenido principal */
.app-header {
  background-color: transparent;
  color: #979797; /* Un gris suave que no distrae */
  padding: 15px 20px;
  margin-bottom: 20px; /* Espacio para separarlo del contenido */
}

/* Organizo el logo y el título en línea usando flexbox */
/* Flexbox es mi solución preferida para alinear elementos horizontalmente */
.logo {
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre el logo y el texto */
}

/* Mantengo el logo con un tamaño apropiado */
.logo-img {
  height: 60px;
  width: auto; /* Conservo la proporción original */
}

/* Estilo el título para que destaque sin ser demasiado invasivo */
h1 {
  margin: 0; /* Elimino los márgenes por defecto */
  font-size: 32px;
  font-weight: 600; /* Un poco más ligero que bold (700) */
}
</style>
