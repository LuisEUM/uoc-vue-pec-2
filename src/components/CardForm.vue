<template>
  <!-- Mi formulario para añadir o editar shows, con validación y estilos personalizados -->
  <div class="show-form">
    <!-- Cabecera del formulario con título dinámico y botón de cierre -->
    <div class="form-header">
      <h2>{{ showToEdit ? 'Edit Show' : 'Add New Show' }}</h2>
      <button class="close-btn" @click="$emit('cancelEdit')">
        <img src="/src/assets/arrow-right.svg" alt="Close" />
      </button>
    </div>
    
    <!-- Cuerpo del formulario con todos los campos -->
    <div class="form-body">
      <!-- Campo de título con validación -->
      <div class="form-group">
        <label>Title:</label>
        <input 
          type="text" 
          v-model="formData.title" 
          class="form-control"
          :class="{ 'error-input': errors.title }"
          required
        />
        <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
      </div>
      
      <!-- Campo de descripción con validación -->
      <div class="form-group">
        <label>Description:</label>
        <textarea 
          v-model="formData.description" 
          class="form-control"
          :class="{ 'error-input': errors.description }"
          rows="3"
          required
        ></textarea>
        <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
      </div>
      
      <!-- Campo para URL de imagen con validación -->
      <div class="form-group">
        <label>Image URL:</label>
        <input 
          type="url" 
          v-model="formData.image" 
          class="form-control"
          :class="{ 'error-input': errors.image }"
        />
        <div v-if="errors.image" class="error-message">{{ errors.image }}</div>
      </div>
      
      <!-- Campo para año con validación -->
      <div class="form-group">
        <label>Year:</label>
        <input 
          type="number" 
          v-model.number="formData.year" 
          class="form-control"
          :class="{ 'error-input': errors.year }"
          :min="1900"
          :max="new Date().getFullYear()"
        />
        <div v-if="errors.year" class="error-message">{{ errors.year }}</div>
      </div>
      
      <!-- Campo para rating con validación -->
      <div class="form-group">
        <label>Rating:</label>
        <input 
          type="number" 
          v-model.number="formData.rating" 
          class="form-control"
          :class="{ 'error-input': errors.rating }"
          min="0"
          max="5"
          step="0.1"
        />
        <div v-if="errors.rating" class="error-message">{{ errors.rating }}</div>
      </div>
      
      <!-- Campo para tags separados por comas -->
      <div class="form-group">
        <label>Tags:</label>
        <input 
          type="text" 
          v-model="tagsInput" 
          class="form-control"
          placeholder="Enter tags separated by commas"
        />
      </div>
      
      <!-- Campo para notas adicionales -->
      <div class="form-group">
        <label>Notes:</label>
        <textarea 
          v-model="formData.notes" 
          class="form-control"
          rows="2"
        ></textarea>
      </div>
      
      <!-- Selector de color para personalizar el show -->
      <div class="form-group">
        <label>Color:</label>
        <div class="color-input-container">
          <input 
            type="color" 
            v-model="formData.color" 
            class="form-control color-picker"
          />
        </div>
      </div>
    </div>
    
    <!-- Pie del formulario con botón de guardar -->
    <div class="form-footer">
      <button class="save-btn" @click="handleSave">
        {{ showToEdit ? 'Save Changes' : 'Add Show' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useToast } from '../composables/useToast';

// Inicializo mi composable de toasts para notificaciones
const toast = useToast();

// Defino las props que recibe mi componente
const props = defineProps({
  // Si estoy editando un show existente, me lo pasan por esta prop
  showToEdit: {
    type: Object,
    default: null // null significa que estoy creando uno nuevo
  }
});

// Defino los eventos que emite mi componente
const emit = defineEmits(['saveShow', 'cancelEdit']);

// Estado reactivo para mi formulario
const formData = ref({
  title: '',
  description: '',
  image: '',
  year: new Date().getFullYear(), // Año actual por defecto
  rating: 3, // Rating medio por defecto
  notes: '',
  color: '#000000' // Color negro por defecto
});

// Los tags los manejo como string separado por comas para mejor UX
const tagsInput = ref('');
// Objeto para almacenar errores de validación
const errors = ref({});

// Métodos de mi componente
const initializeForm = () => {
  // Reseteo errores al inicializar
  errors.value = {};
  
  if (props.showToEdit) {
    // Si estoy editando, copio los datos del show existente
    formData.value = { ...props.showToEdit };
    // Convierto el array de tags a string separado por comas
    tagsInput.value = props.showToEdit.tags?.join(', ') || '';
  } else {
    // Si estoy creando, inicializo con valores por defecto
    formData.value = {
      title: '',
      description: '',
      image: '',
      year: new Date().getFullYear(),
      rating: 3,
      notes: '',
      color: '#000000'
    };
    tagsInput.value = '';
  }
};

// Función de validación completa del formulario
const validateForm = () => {
  const newErrors = {};
  
  // Validación del título (obligatorio)
  if (!formData.value.title.trim()) {
    newErrors.title = 'Title is required';
  }
  
  // Validación de la descripción (obligatorio)
  if (!formData.value.description.trim()) {
    newErrors.description = 'Description is required';
  }
  
  // Validación de la imagen (obligatorio y debe ser URL válida)
  if (!formData.value.image) {
    newErrors.image = 'Image URL is required';
  } else if (!isValidURL(formData.value.image)) {
    newErrors.image = 'Please enter a valid URL';
  }
  
  // Validación del año (debe estar en un rango razonable)
  if (formData.value.year) {
    const year = Number(formData.value.year);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear) {
      newErrors.year = `Year must be between 1900 and ${currentYear}`;
    }
  }
  
  // Validación del rating (0-5)
  if (formData.value.rating < 0 || formData.value.rating > 5) {
    newErrors.rating = 'Rating must be between 0 and 5';
  }
  
  // Actualizo el estado de errores y devuelvo si el form es válido
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

// Función auxiliar para validar URLs
const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Manejo del guardado del formulario
const handleSave = () => {
  // Primero valido el formulario
  if (!validateForm()) {
    toast.showError('Validation Error', 'Please correct the errors in the form');
    return;
  }
  
  // Proceso los tags de string a array
  const tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  try {
    // Preparo el objeto para enviar a la API
    const showData = {
      ...formData.value,
      tags: tags.length > 0 ? tags : ['uncategorized'], // Aseguro tener al menos un tag
      // Formateo el año como fecha para la API
      releaseDate: formData.value.year ? `${formData.value.year}-01-01` : new Date().toISOString().split('T')[0]
    };
    
    // Loggeo para depuración
    console.log('Sending to API:', showData);
    
    // Emito el evento para que el padre maneje el guardado
    emit('saveShow', showData);
  } catch (error) {
    toast.showError('Form Error', 'An error occurred while saving the show');
    console.error('Error in handleSave:', error);
  }
};

// Observo cambios en la prop showToEdit para reinicializar el formulario
watch(
  () => props.showToEdit,
  () => {
    initializeForm();
  }
);

// Inicializo el formulario cuando el componente se monta
onMounted(() => {
  initializeForm();
});
</script>

<style scoped>
/* Contenedor principal del formulario con colores oscuros para contrastar */
.show-form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  max-height: 80dvh;
  background-color: #393a41; /* Fondo oscuro para contrastar */
  color: white;
  min-width: 400px;
  min-height: 100%;
}

/* Cabecera del formulario con título y botón de cierre */
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 10px;
}

/* Título del formulario */
.form-header h2 {
  margin: 0;
  font-size: 20px;
  color: white;
  font-weight: normal;
}

/* Botón de cierre con estilo circular */
.close-btn {
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}

/* Imagen del botón de cierre */
.close-btn img {
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(21%) sepia(5%) saturate(9%)
    hue-rotate(358deg) brightness(95%) contrast(85%);
  stroke-width: 2px;
}

/* Cuerpo del formulario con scroll si es necesario */
.form-body {
  padding: 15px 0;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

/* Grupo de formulario para cada campo */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

/* Etiquetas de los campos */
.form-group label {
  display: block;
  margin-bottom: 5px;
  color: white;
}

/* Estilo común para todos los inputs */
.form-control {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  color: #333;
}

/* Inputs con error destacados en rojo */
.error-input {
  border: 2px solid #f56c6c;
}

/* Mensajes de error en rojo */
.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 5px;
}

/* Permitir que los textareas se puedan redimensionar verticalmente */
textarea.form-control {
  resize: vertical;
}

/* Selector de color con estilo personalizado */
.color-picker {
  width: 100%;
  height: 40px;
  padding: 2px;
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
}

/* Contenedor para el input de color */
.color-input-container {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  border: 2px solid white;
  border-radius: 4px;
  overflow: hidden;
}

/* Input de color dentro del contenedor */
.color-input-container .color-picker {
  border: none;
  width: 100%;
  height: 42px;
  padding: 0;
  background-color: transparent;
}

/* Estilos específicos para inputs de color en diferentes navegadores */
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 2px;
}

/* Soporte para Firefox */
input[type="color"]::-moz-color-swatch {
  border: none;
  border-radius: 2px;
}

input[type="color"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Oculto el antiguo preview de color que ya no necesito */
.color-preview {
  display: none;
}

/* Pie del formulario con botón de guardar */
.form-footer {
  padding: 15px 0;
  text-align: center;
  width: 100%;
}

/* Botón de guardar con color destacado */
.save-btn {
  background-color: #4662f8; /* Azul que combina con el diseño */
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  font-size: 16px;
}

/* Contenedor de acciones del formulario */
.form-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 20px;
}

/* Título del formulario para encabezados */
.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-heading);
}

/* Media queries para responsividad */
@media (max-width: 1200px) {
  .show-form {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .show-form {
    padding: 15px;
    min-height: 300px;
  }
  
  .form-header h2 {
    font-size: 18px;
  }
}
</style> 