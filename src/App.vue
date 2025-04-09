<script setup>
import { ref, computed, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import ShowFilterBar from './components/ShowFilterBar.vue';
import ShowGrid from './components/ShowGrid.vue';
import ShowForm from './components/ShowForm.vue';

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
  allShows.value = [
    { id: 1, title: 'Breaking Bad', description: 'A high school chemistry teacher turned methamphetamine producer.', image: '/images/breaking_bad.jpg', rating: 5, tags: ['Drama', 'Thriller', 'Crime'], year: 2008, notes: '', color: '#4CAF50' },
    { id: 2, title: 'Stranger Things', description: 'A group of kids uncovering supernatural mysteries in their town.', image: '/images/stranger_things.jpg', rating: 4.5, tags: ['Sci-Fi', 'Horror', 'Mystery'], year: 2016, notes: '', color: '#F44336' },
    { id: 3, title: 'The Walking Dead', description: 'Survivors of a zombie apocalypse fight to stay alive.', image: '/images/the_walking_dead.jpg', rating: 4, tags: ['Horror', 'Drama', 'Action'], year: 2010, notes: '', color: '#9E9E9E' },
    { id: 4, title: 'Game of Thrones', description: 'Noble families vie for control of the Iron Throne.', image: '/images/game_of_thrones.jpg', rating: 4.8, tags: ['Fantasy', 'Drama', 'Action'], year: 2011, notes: '', color: '#607D8B' },
    { id: 5, title: 'American Horror Story', description: 'An anthology series centering on different characters and locations.', image: '/images/american_horror_story_murder_house.jpg', rating: 3.5, tags: ['Horror', 'Drama', 'Thriller'], year: 2011, notes: 'Each season is different', color: '#000000' },
    { id: 6, title: 'The Mandalorian', description: 'A lone bounty hunter makes his way through the outer reaches of the galaxy.', image: '/images/the_mandalorian.jpg', rating: 4.7, tags: ['Sci-Fi', 'Action', 'Adventure'], year: 2019, notes: 'Star Wars Universe', color: '#2196F3' },
    { id: 7, title: 'The Witcher', description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world.', image: '/images/the_witcher.jpg', rating: 4.3, tags: ['Fantasy', 'Action', 'Drama'], year: 2019, notes: 'Based on the books', color: '#FFC107' },
    { id: 8, title: 'Black Mirror', description: 'An anthology series exploring a twisted high-tech world.', image: '/images/black_mirror.jpg', rating: 4.6, tags: ['Sci-Fi', 'Drama', 'Thriller'], year: 2011, notes: 'Technology gone wrong', color: '#9C27B0' },
    { id: 9, title: 'The Boys', description: 'A group of vigilantes set out to take down corrupt superheroes.', image: '/images/the_boys.jpg', rating: 4.7, tags: ['Action', 'Comedy', 'Crime'], year: 2019, notes: 'Superhero satire', color: '#E91E63' },
    { id: 10, title: 'Dark', description: 'A family saga with a supernatural twist, set in a German town.', image: '/images/dark.jpg', rating: 4.8, tags: ['Sci-Fi', 'Drama', 'Mystery'], year: 2017, notes: 'Mind-bending time travel', color: '#795548' },
    { id: 11, title: 'The Crown', description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.', image: '/images/the_crown.jpg', rating: 4.4, tags: ['Drama', 'History', 'Biography'], year: 2016, notes: 'Based on true events', color: '#673AB7' },
    { id: 12, title: 'Westworld', description: 'A dark odyssey about the dawn of artificial consciousness.', image: '/images/westworld.jpg', rating: 4.5, tags: ['Sci-Fi', 'Drama', 'Mystery'], year: 2016, notes: 'AI and consciousness', color: '#FF5722' }
  ];
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

<style>
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #e9ecef;
}

#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  height: 100dvh;
  overflow-y: auto;
  padding: 0 20px;
}

.content-area {
  display: flex;
  flex-grow: 1;
  position: relative;
  gap: 20px;
  min-height: 80dvh;
  width: 100%;
}

main {
  display: flex;
  flex-grow: 1;
  gap: 20px;
  height: 100%;
  width: 100%;
}

.show-grid {
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.sidebar-form {
  width: 400px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
  position: sticky;
  top: 20px;
  max-height: 80dvh;
  overflow-y: auto;
}

/* Ajusta el espacio disponible cuando el formulario está visible */
.content-area:has(.sidebar-form) .show-grid {
  width: calc(100%);
}

@media (max-width: 1200px) {
  .content-area {
    flex-direction: column;
    min-height: auto;
  }

  .sidebar-form {
    width: 100%;
    position: static;
    max-height: none;
  }

  .content-area:has(.sidebar-form) .show-grid {
    width: 100%;
  }
}

.app-header {
  margin: 0 -20px;
  padding: 30px 20px;
  color: #4a4a4a;
  font-size: 28px;
  font-weight: 500;
}
</style>
