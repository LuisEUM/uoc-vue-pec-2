<template>
  <div class="show-form">
    <div class="form-header">
      <h2>{{ showToEdit ? 'Edit Show' : 'Add New Show' }}</h2>
      <button class="close-btn" @click="$emit('cancelEdit')">
        <img src="/src/assets/arrow-right.svg" alt="Close" />
      </button>
    </div>
    
    <div class="form-body">
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
      
      <div class="form-group">
        <label>Tags:</label>
        <input 
          type="text" 
          v-model="tagsInput" 
          class="form-control"
          placeholder="Enter tags separated by commas"
        />
      </div>
      
      <div class="form-group">
        <label>Notes:</label>
        <textarea 
          v-model="formData.notes" 
          class="form-control"
          rows="2"
        ></textarea>
      </div>
      
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

// Get toast functions
const toast = useToast();

// Define props and emits
const props = defineProps({
  showToEdit: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['saveShow', 'cancelEdit']);

// Reactive state
const formData = ref({
  title: '',
  description: '',
  image: '',
  year: new Date().getFullYear(),
  rating: 3,
  notes: '',
  color: '#000000'
});

const tagsInput = ref('');
const errors = ref({});

// Methods
const initializeForm = () => {
  errors.value = {};
  
  if (props.showToEdit) {
    formData.value = { ...props.showToEdit };
    tagsInput.value = props.showToEdit.tags?.join(', ') || '';
  } else {
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

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.value.title.trim()) {
    newErrors.title = 'Title is required';
  }
  
  if (!formData.value.description.trim()) {
    newErrors.description = 'Description is required';
  }
  
  // Image is required by the API
  if (!formData.value.image) {
    newErrors.image = 'Image URL is required';
  } else if (!isValidURL(formData.value.image)) {
    newErrors.image = 'Please enter a valid URL';
  }
  
  if (formData.value.year) {
    const year = Number(formData.value.year);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear) {
      newErrors.year = `Year must be between 1900 and ${currentYear}`;
    }
  }
  
  if (formData.value.rating < 0 || formData.value.rating > 5) {
    newErrors.rating = 'Rating must be between 0 and 5';
  }
  
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const handleSave = () => {
  if (!validateForm()) {
    toast.showError('Validation Error', 'Please correct the errors in the form');
    return;
  }
  
  const tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  try {
    // Convert year to releaseDate format for the API
    const showData = {
      ...formData.value,
      tags: tags.length > 0 ? tags : ['uncategorized'], // Ensure we have at least one tag
      // Format the year as a date string the API expects
      releaseDate: formData.value.year ? `${formData.value.year}-01-01` : new Date().toISOString().split('T')[0]
    };
    
    // Log what we're sending to the API for debugging
    console.log('Sending to API:', showData);
    
    emit('saveShow', showData);
  } catch (error) {
    toast.showError('Form Error', 'An error occurred while saving the show');
    console.error('Error in handleSave:', error);
  }
};

// Watchers
watch(
  () => props.showToEdit,
  () => {
    initializeForm();
  }
);

// Lifecycle hooks
onMounted(() => {
  initializeForm();
});
</script>

<style scoped>
.show-form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  max-height: 80dvh;
  background-color: #393a41;
  color: white;
  min-width: 400px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 10px;
}

.form-header h2 {
  margin: 0;
  font-size: 20px;
  color: white;
  font-weight: normal;
}

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

.close-btn img {
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(21%) sepia(5%) saturate(9%)
    hue-rotate(358deg) brightness(95%) contrast(85%);
  stroke-width: 2px;
}

.form-body {
  padding: 15px 0;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: white;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  color: #333;
}

.error-input {
  border: 2px solid #f56c6c;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 5px;
}

textarea.form-control {
  resize: vertical;
}

.color-picker {
  width: 100%;
  height: 40px;
  padding: 2px;
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
}

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

.color-input-container .color-picker {
  border: none;
  width: 100%;
  height: 42px;
  padding: 0;
  background-color: transparent;
}

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

.color-preview {
  display: none; /* Ya no necesito el antiguo preview, lo oculto */
}

.form-footer {
  padding: 15px 0;
  text-align: center;
  width: 100%;
}

.save-btn {
  background-color: #4662f8;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  font-size: 16px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 20px;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-heading);
}

@media (max-width: 1200px) {
  .show-form {
    max-height: none;
  }
}
</style> 