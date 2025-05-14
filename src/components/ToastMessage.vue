<template>
  <Teleport to="body">
    <div class="toast-container">
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type}`]"
        >
          <div class="toast__icon">
            <span v-if="toast.type === 'error'">❌</span>
            <span v-else-if="toast.type === 'success'">✅</span>
            <span v-else-if="toast.type === 'warning'">⚠️</span>
            <span v-else>ℹ️</span>
          </div>
          <div class="toast__content">
            <div class="toast__title">{{ toast.title }}</div>
            <div class="toast__message">{{ toast.message }}</div>
          </div>
          <button class="toast__close" @click="removeToast(toast.id)">×</button>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Toast data store
const toasts = ref([]);
let toastIdCounter = 0;

// Toast functions
const addToast = (title, message, type = 'info', timeout = 5000) => {
  const id = toastIdCounter++;
  
  toasts.value.push({
    id,
    title,
    message,
    type, // 'error', 'success', 'warning', 'info'
    timeout
  });

  if (timeout > 0) {
    setTimeout(() => {
      removeToast(id);
    }, timeout);
  }

  return id;
};

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
};

// Event bus for sending messages from anywhere in the app
const setupEventListener = () => {
  window.addEventListener('toast', (e) => {
    const { title, message, type, timeout } = e.detail;
    addToast(title, message, type, timeout);
  });
};

const removeEventListener = () => {
  window.removeEventListener('toast', () => {});
};

// Helper function to show toast via event
const showToast = (title, message, type = 'info', timeout = 5000) => {
  window.dispatchEvent(new CustomEvent('toast', {
    detail: { title, message, type, timeout }
  }));
};

// Lifecycle hooks
onMounted(() => {
  setupEventListener();
});

onUnmounted(() => {
  removeEventListener();
});

// Make functions available to other components
defineExpose({
  addToast,
  removeToast,
  showToast
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
}

.toast {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  padding: 12px;
  position: relative;
  animation: slide-in 0.3s ease-out;
  border-left: 4px solid #888;
}

.toast--error {
  border-left-color: #f56c6c;
}

.toast--success {
  border-left-color: #67c23a;
}

.toast--warning {
  border-left-color: #e6a23c;
}

.toast--info {
  border-left-color: #409eff;
}

.toast__icon {
  margin-right: 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.toast__content {
  flex: 1;
}

.toast__title {
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 16px;
}

.toast__message {
  font-size: 14px;
  color: #666;
}

.toast__close {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 0 5px;
  align-self: flex-start;
}

.toast__close:hover {
  color: #555;
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

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