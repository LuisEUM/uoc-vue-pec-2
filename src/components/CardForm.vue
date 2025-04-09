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
@import "../styles/components/CardForm.css";
</style> 