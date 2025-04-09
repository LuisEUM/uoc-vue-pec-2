<template>
  <div class="show-form">
    <div class="form-header">
      <h2>{{ showToEdit ? 'Edit Show' : 'Add New Show' }}</h2>
      <button class="close-btn" @click="$emit('cancelEdit')">
        <img src="/arrow-right.svg" alt="Close" />
      </button>
    </div>
    
    <div class="form-body">
      <div class="form-group">
        <label>Title:</label>
        <input 
          type="text" 
          v-model="formData.title" 
          class="form-control"
          required
        />
      </div>
      
      <div class="form-group">
        <label>Description:</label>
        <textarea 
          v-model="formData.description" 
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>
      
      <div class="form-group">
        <label>Image URL:</label>
        <input 
          type="url" 
          v-model="formData.image" 
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label>Year:</label>
        <input 
          type="number" 
          v-model.number="formData.year" 
          class="form-control"
          :min="1900"
          :max="new Date().getFullYear()"
        />
      </div>
      
      <div class="form-group">
        <label>Rating:</label>
        <input 
          type="number" 
          v-model.number="formData.rating" 
          class="form-control"
          min="0"
          max="5"
          step="0.1"
        />
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
        <input 
          type="color" 
          v-model="formData.color" 
          class="form-control color-picker"
        />
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
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  showToEdit: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['saveShow', 'cancelEdit']);

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

const initializeForm = () => {
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

onMounted(initializeForm);

watch(() => props.showToEdit, initializeForm);

const handleSave = () => {
  if (!formData.value.title || !formData.value.description) {
    alert('Please fill in all required fields');
    return;
  }
  
  const tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  emit('saveShow', {
    ...formData.value,
    tags
  });
};
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
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn img {
  width: 20px;
  height: 20px;
  filter: invert(1);
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

textarea.form-control {
  resize: vertical;
}

.color-picker {
  height: 40px;
  padding: 0;
  background: none;
}

.form-footer {
  padding: 15px 0;
  text-align: right;
}

.save-btn {
  background-color: #4662f8;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
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