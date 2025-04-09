<template>
  <div class="card-form" v-if="isVisible">
    <h3>Add a new show</h3>
    <input type="text" placeholder="Title" v-model="newShow.title" />
    <textarea placeholder="Description" v-model="newShow.description"></textarea>
    <input type="text" placeholder="Image URL" v-model="newShow.image" />
    <input type="number" placeholder="Rating" v-model="newShow.rating" min="0" max="5" step="0.1" />
    <input type="text" placeholder="Tags" v-model="newShow.tags" />
    <textarea placeholder="Notes" v-model="newShow.notes"></textarea>
    <input type="color" v-model="newShow.color" />
    <button @click="addShow">Add show</button>
  </div>
</template>

<script>
export default {
  name: "CardForm",
  data() {
    return {
      isVisible: true,
      newShow: {
        title: '',
        description: '',
        image: '',
        rating: 0,
        tags: '',
        notes: '',
        color: '#ffffff'
      }
    };
  },
  methods: {
    addShow() {
      this.$emit('add-show', { ...this.newShow, tags: this.newShow.tags.split(',').map(tag => tag.trim()) });
      this.resetForm();
    },
    resetForm() {
      this.newShow = {
        title: '',
        description: '',
        image: '',
        rating: 0,
        tags: '',
        notes: '',
        color: '#ffffff'
      };
    }
  }
}
</script>

<style scoped>
.card-form {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
</style> 