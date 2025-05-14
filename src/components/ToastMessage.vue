<template>
  <!-- Uso Teleport para insertar estas notificaciones directamente en el body -->
  <!-- Esto me permite que estén por encima de todo, sin importar el z-index del contenedor padre -->
  <Teleport to="body">
    <div class="toast-container">
      <!-- Uso transition-group para animar la entrada y salida de cada toast -->
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type}`]"
        >
          <!-- Icono diferente según el tipo de notificación -->
          <div class="toast__icon">
            <span v-if="toast.type === 'error'">❌</span>
            <span v-else-if="toast.type === 'success'">✅</span>
            <span v-else-if="toast.type === 'warning'">⚠️</span>
            <span v-else>ℹ️</span>
          </div>
          <!-- Contenido de la notificación con título y mensaje -->
          <div class="toast__content">
            <div class="toast__title">{{ toast.title }}</div>
            <div class="toast__message">{{ toast.message }}</div>
          </div>
          <!-- Botón para cerrar la notificación manualmente -->
          <button class="toast__close" @click="removeToast(toast.id)">×</button>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Almaceno mis toasts en un array reactivo
const toasts = ref([]);
let toastIdCounter = 0; // Contador para generar IDs únicos

// Función para añadir una nueva notificación
const addToast = (title, message, type = 'info', timeout = 5000) => {
  const id = toastIdCounter++; // Genero un ID único
  
  // Añado el nuevo toast al array
  toasts.value.push({
    id,
    title,
    message,
    type, // 'error', 'success', 'warning', 'info'
    timeout
  });

  // Si tiene timeout, configuro su eliminación automática
  if (timeout > 0) {
    setTimeout(() => {
      removeToast(id);
    }, timeout);
  }

  return id; // Devuelvo el ID por si quieren manipularlo después
};

// Función para eliminar una notificación por su ID
const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
};

// Uso eventos globales para poder mostrar toasts desde cualquier parte de la app
// Esta es una técnica que me parece muy útil para comunicación entre componentes
const setupEventListener = () => {
  window.addEventListener('toast', (e) => {
    const { title, message, type, timeout } = e.detail;
    addToast(title, message, type, timeout);
  });
};

// Limpieza del event listener cuando el componente se desmonta
const removeEventListener = () => {
  window.removeEventListener('toast', () => {});
};

// Función helper para mostrar toasts via eventos
// Esta no la uso directamente, pero la expongo por si algún componente
// quiere acceder directamente a este componente vía ref
const showToast = (title, message, type = 'info', timeout = 5000) => {
  window.dispatchEvent(new CustomEvent('toast', {
    detail: { title, message, type, timeout }
  }));
};

// Hooks del ciclo de vida
onMounted(() => {
  // Configuro el listener cuando el componente se monta
  setupEventListener();
});

onUnmounted(() => {
  // Limpio el listener cuando el componente se desmonta
  removeEventListener();
});

// Expongo las funciones para que sean accesibles desde fuera
// Esto permite que otros componentes accedan a estas funciones usando refs
defineExpose({
  addToast,
  removeToast,
  showToast
});
</script>

<style scoped>
/* Contenedor principal fijo en la esquina superior derecha */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999; /* Aseguro que esté por encima de todo */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espacio entre notificaciones */
  max-width: 350px; /* Ancho máximo para no ocupar demasiada pantalla */
}

/* Estilo base para todas las notificaciones */
.toast {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Sombra sutil */
  overflow: hidden;
  display: flex;
  padding: 12px;
  position: relative;
  animation: slide-in 0.3s ease-out; /* Animación inicial */
  border-left: 4px solid #888; /* Borde izquierdo para el color del tipo */
}

/* Estilos específicos para cada tipo de notificación */
.toast--error {
  border-left-color: #f56c6c; /* Rojo para errores */
}

.toast--success {
  border-left-color: #67c23a; /* Verde para éxitos */
}

.toast--warning {
  border-left-color: #e6a23c; /* Naranja para advertencias */
}

.toast--info {
  border-left-color: #409eff; /* Azul para información */
}

/* Estilo para el contenedor del icono */
.toast__icon {
  margin-right: 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
}

/* Contenido principal con flex-grow para ocupar espacio disponible */
.toast__content {
  flex: 1;
}

/* Título en negrita para destacar */
.toast__title {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 16px;
}

/* Mensaje en gris y tamaño más pequeño */
.toast__message {
  font-size: 14px;
  color: #666;
}

/* Botón de cierre con estilo minimalista */
.toast__close {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 0 5px;
  align-self: flex-start;
}

/* Efecto hover para el botón de cierre */
.toast__close:hover {
  color: #555; /* Más oscuro al hacer hover */
}

/* Transiciones para la entrada y salida de notificaciones */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

/* Estado inicial al entrar */
.toast-enter-from {
  transform: translateX(100%); /* Viene desde la derecha */
  opacity: 0;
}

/* Estado final al salir */
.toast-leave-to {
  transform: translateX(100%); /* Sale hacia la derecha */
  opacity: 0;
}

/* Keyframes para la animación de entrada */
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 