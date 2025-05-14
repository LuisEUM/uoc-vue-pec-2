// Este es el punto de entrada de mi aplicación Vue.js
// Aquí importo las dependencias básicas para hacerla funcionar

import { createApp } from "vue"; // Importo la función createApp de Vue 3
import "./styles/globalStyles.css"; // Importo mis estilos globales para toda la app
import App from "./App.vue"; // Importo mi componente principal App

// Creo la instancia de mi aplicación y la monto en el elemento con id "app" del HTML
// Esta es la forma moderna de inicializar apps en Vue 3 (mucho más simple que en Vue 2)
createApp(App).mount("#app");
