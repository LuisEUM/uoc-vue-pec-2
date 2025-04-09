<script setup>
import { ref, computed, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import ShowFilterBar from './components/ShowFilterBar.vue';
import ShowGrid from './components/ShowGrid.vue';
import ShowForm from './components/ShowForm.vue';
import showsData from './mockData/shows.json';

const allShows = ref([]);
const filters = ref({
    searchTerm: '',
    tag: '',
    minRating: 0,
    sortBy: 'title',
    sortOrder: 'asc',
});
const isFormVisible = ref(false);
const showBeingEdited = ref(null);

const fetchShows = () => {
  // Usar datos desde el archivo JSON
  allShows.value = showsData.map(show => ({
    ...show,
    // Asegurarse de que todas las propiedades necesarias estén presentes
    tags: show.tags ? show.tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)) : [],
    year: show.releaseDate || show.year || 'Unknown',
    rating: show.rating || 0,
    notes: show.notes || ''
  }));
};

onMounted(() => {
  fetchShows();
});

const availableTags = computed(() => {
    const tagsSet = new Set();
    allShows.value.forEach(show => {
        show.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
});

const filteredAndSortedShows = computed(() => {
  let result = [...allShows.value];

  if (filters.value.searchTerm) {
    const term = filters.value.searchTerm.toLowerCase();
    result = result.filter(show =>
      show.title.toLowerCase().includes(term) ||
      show.description.toLowerCase().includes(term)
    );
  }

  if (filters.value.tag) {
    result = result.filter(show => show.tags?.includes(filters.value.tag));
  }

  if (filters.value.minRating > 0) {
    result = result.filter(show => show.rating >= filters.value.minRating);
  }

  result.sort((a, b) => {
    let valA = a[filters.value.sortBy];
    let valB = b[filters.value.sortBy];

    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA == null) return 1;
    if (valB == null) return -1;

    let comparison = 0;
    if (valA < valB) comparison = -1;
    if (valA > valB) comparison = 1;

    return filters.value.sortOrder === 'asc' ? comparison : comparison * -1;
  });

  return result;
});

const deleteShow = (showId) => {
  allShows.value = allShows.value.filter(show => show.id !== showId);
  if (showBeingEdited.value?.id === showId) {
      closeForm();
  }
};

const saveShow = (showData) => {
  const index = allShows.value.findIndex(s => s.id === showData.id);
  if (index !== -1) {
    allShows.value.splice(index, 1, showData);
  } else {
    if (!showData.id) showData.id = Date.now();
    allShows.value.push(showData);
  }
  closeForm();
};

const openAddForm = () => {
  showBeingEdited.value = null;
  isFormVisible.value = true;
};

const closeForm = () => {
  isFormVisible.value = false;
  showBeingEdited.value = null;
};

const resetFilters = () => {
  filters.value = {
    searchTerm: '',
    tag: '',
    minRating: 0,
    sortBy: 'title',
    sortOrder: 'asc',
  };
};

</script>

<template>
  <div id="app-layout">
    <AppHeader user-name="Luis Eduardo Urdaneta Martucci" />
    <ShowFilterBar
      v-model="filters"
      @addShowRequest="openAddForm"
      @clearFilters="resetFilters"
      :tag-options="availableTags"
    />
    <main class="content-area">
      <ShowGrid 
        :shows="filteredAndSortedShows" 
        @deleteShow="deleteShow" 
      />
      <ShowForm
        v-if="isFormVisible"
        :show-to-edit="showBeingEdited"
        @saveShow="saveShow"
        @cancelEdit="closeForm"
        class="sidebar-form"
      />
    </main>
  </div>
</template>
