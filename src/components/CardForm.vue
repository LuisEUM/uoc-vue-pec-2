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

<script>
export default {
  name: 'CardForm',
  props: {
    showToEdit: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        title: '',
        description: '',
        image: '',
        year: new Date().getFullYear(),
        rating: 3,
        notes: '',
        color: '#000000'
      },
      tagsInput: ''
    };
  },
  methods: {
    initializeForm() {
      if (this.showToEdit) {
        this.formData = { ...this.showToEdit };
        this.tagsInput = this.showToEdit.tags?.join(', ') || '';
      } else {
        this.formData = {
          title: '',
          description: '',
          image: '',
          year: new Date().getFullYear(),
          rating: 3,
          notes: '',
          color: '#000000'
        };
        this.tagsInput = '';
      }
    },
    handleSave() {
      if (!this.formData.title || !this.formData.description) {
        alert('Please fill in all required fields');
        return;
      }
      
      const tags = this.tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      this.$emit('saveShow', {
        ...this.formData,
        tags
      });
    }
  },
  mounted() {
    this.initializeForm();
  },
  watch: {
    showToEdit: {
      handler() {
        this.initializeForm();
      }
    }
  },
  emits: ['saveShow', 'cancelEdit']
}
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