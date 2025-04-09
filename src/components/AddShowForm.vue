<template>
  <div class="add-show-overlay">
    <div class="add-show-form">
      <div class="form-header">
        <h2>Add a new show</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="form-body">
        <div class="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            v-model="newShow.title" 
            class="form-control"
            required
          />
        </div>
        
        <div class="form-group">
          <label>Description:</label>
          <textarea 
            v-model="newShow.description" 
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>
        
        <div class="form-group">
          <label>Image URL:</label>
          <input 
            type="url" 
            v-model="newShow.image" 
            class="form-control"
          />
        </div>
        
        <div class="form-group">
          <label>Rating:</label>
          <input 
            type="number" 
            v-model.number="newShow.rating" 
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
            v-model="newShow.notes" 
            class="form-control"
            rows="2"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label>Color:</label>
          <input 
            type="color" 
            v-model="newShow.color" 
            class="form-control color-picker"
          />
        </div>
      </div>
      
      <div class="form-footer">
        <button class="add-show-btn" @click="submitForm">Add show</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddShowForm',
  data() {
    return {
      tagsInput: '',
      newShow: {
        title: '',
        description: '',
        year: new Date().getFullYear(),
        image: '',
        rating: 3,
        notes: '',
        color: '#000000'
      }
    };
  },
  methods: {
    submitForm() {
      if (!this.newShow.title || !this.newShow.description) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Process tags from comma-separated string to array
      const tags = this.tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const showToAdd = {
        ...this.newShow,
        tags
      };
      
      this.$emit('add-show', showToAdd);
      
      // Reset form
      this.newShow = {
        title: '',
        description: '',
        year: new Date().getFullYear(),
        image: '',
        rating: 3,
        notes: '',
        color: '#000000'
      };
      this.tagsInput = '';
    }
  }
};
</script>

<style scoped>
.add-show-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.add-show-form {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.form-header h2 {
  margin: 0;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.form-body {
  padding: 15px;
  overflow-y: auto;
  max-height: 60vh;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

textarea.form-control {
  resize: vertical;
}

.color-picker {
  height: 40px;
  padding: 0;
}

.form-footer {
  padding: 15px;
  text-align: center;
  border-top: 1px solid #ddd;
}

.add-show-btn {
  background-color: #4662f8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}
</style> 