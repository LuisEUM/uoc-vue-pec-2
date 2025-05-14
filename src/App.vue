<template>
  <div id="app-layout">
    <AppHeader user-name="Luis Eduardo Urdaneta Martucci" />
    <FilterBar
      v-model="filters"
      @addShowRequest="openAddForm"
      @clearFilters="resetFilters"
      :tag-options="availableTags"
    />
    <main class="content-area">
      <CardBoard :showList="filteredAndSortedShows" @deleteShow="deleteShow" />
      <CardForm
        v-if="isFormVisible"
        :show-to-edit="showBeingEdited"
        @saveShow="saveShow"
        @cancelEdit="closeForm"
        class="sidebar-form"
      />
    </main>
    <ToastMessage ref="toastRef" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import AppHeader from "./components/AppHeader.vue";
import FilterBar from "./components/FilterBar.vue";
import CardBoard from "./components/CardBoard.vue";
import CardForm from "./components/CardForm.vue";
import ToastMessage from "./components/ToastMessage.vue";
import { useToast } from "./composables/useToast";

// Toast setup
const toastRef = ref(null);
const toast = useToast();

// Reactive state
const allShows = ref([]);
const filters = ref({
  searchTerm: "",
  tag: "",
  minRating: 0,
  sortBy: "title",
  sortOrder: "asc",
});
const isFormVisible = ref(false);
const showBeingEdited = ref(null);

// API base URLs
const SHOWS_URL = 'http://localhost:3000/shows';
const SHOW_URL = 'http://localhost:3000/show';

// Computed properties
const availableTags = computed(() => {
  const tagsSet = new Set();
  allShows.value.forEach((show) => {
    show.tags?.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
});

const filteredAndSortedShows = computed(() => {
  let result = [...allShows.value];

  if (filters.value.searchTerm) {
    const term = filters.value.searchTerm.toLowerCase();
    result = result.filter(
      (show) =>
        show.title.toLowerCase().includes(term) ||
        show.description.toLowerCase().includes(term) ||
        (show.tags && show.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  }

  if (filters.value.tag) {
    result = result.filter((show) => show.tags?.includes(filters.value.tag));
  }

  if (filters.value.minRating > 0) {
    result = result.filter((show) => show.rating >= filters.value.minRating);
  }

  result.sort((a, b) => {
    let valA = a[filters.value.sortBy];
    let valB = b[filters.value.sortBy];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA == null) return 1;
    if (valB == null) return -1;

    let comparison = 0;
    if (valA < valB) comparison = -1;
    if (valA > valB) comparison = 1;

    return filters.value.sortOrder === "asc" ? comparison : comparison * -1;
  });

  return result;
});

// Methods
const fetchShows = async () => {
  try {
    const response = await axios.get(SHOWS_URL);
    console.log('API Response:', response.data);
    
    // The API wraps the actual data in a 'data' property inside the response
    // Check if response.data has the expected structure
    if (response.data && response.data.data) {
      // The actual shows data is in response.data.data
      const showsData = response.data.data;
      
      if (Array.isArray(showsData)) {
        allShows.value = showsData.map((show) => ({
          ...show,
          tags: show.tags
            ? show.tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
            : [],
          releaseDate: show.releaseDate || show.year || "Unknown",
          rating: show.rating || 0,
          notes: show.notes || "",
        }));
        
        if (allShows.value.length > 0) {
          toast.showSuccess('Data Loaded', `Successfully loaded ${allShows.value.length} shows`);
        } else {
          toast.showInfo('No Shows', 'No shows found in the database. Add some!');
        }
      } else {
        console.error('Expected array in data property but got:', typeof showsData);
        allShows.value = [];
        toast.showError('Data Format Error', `API returned unexpected format in 'data' property: ${typeof showsData}`);
      }
    } else {
      // Handle case where response.data doesn't have the expected structure
      console.error('Expected { data: [] } structure but got:', response.data);
      allShows.value = [];
      toast.showError('Data Format Error', 'API returned unexpected data structure');
    }
  } catch (error) {
    console.error('Error fetching shows:', error);
    allShows.value = [];
    
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      toast.showError('API Connection Failed', 'Cannot connect to API server. Make sure it is running on port 3000.');
    } else {
      toast.showApiError(error, 'Failed to load shows');
    }
    
    // Rethrow to allow retry mechanism to work
    throw error;
  }
};

const deleteShow = async (showId) => {
  try {
    const deleteResponse = await axios.delete(`${SHOW_URL}/${showId}`);
    console.log('Delete response:', deleteResponse.data);
    
    // Refresh the shows list
    await fetchShows();
    
    if (showBeingEdited.value?.id === showId) {
      closeForm();
    }
    toast.showSuccess('Show Deleted', 'The show has been successfully deleted');
  } catch (error) {
    console.error('Error deleting show:', error);
    toast.showApiError(error, 'Failed to delete show');
  }
};

const saveShow = async (showData) => {
  try {
    // Log what we're sending to help debug
    console.log('Preparing to send to API:', showData);
    
    // Make sure we have the required fields
    if (!showData.title || !showData.description || !showData.image || !showData.releaseDate) {
      const missingFields = [];
      if (!showData.title) missingFields.push('title');
      if (!showData.description) missingFields.push('description');
      if (!showData.image) missingFields.push('image');
      if (!showData.releaseDate) missingFields.push('releaseDate');
      
      toast.showError('Missing Fields', `Required fields missing: ${missingFields.join(', ')}`);
      return;
    }
    
    // Ensure we're sending the right data types
    const apiData = {
      ...showData,
      rating: Number(showData.rating) || 0,
      tags: Array.isArray(showData.tags) ? showData.tags : ['uncategorized'],
      // Make sure releaseDate is a string
      releaseDate: typeof showData.releaseDate === 'string' ? showData.releaseDate : new Date().toISOString().split('T')[0]
    };
    
    let saveResponse;
    
    // If we're editing an existing show
    if (apiData.id) {
      console.log('PUT request to:', `${SHOW_URL}/${apiData.id}`);
      saveResponse = await axios.put(`${SHOW_URL}/${apiData.id}`, apiData);
      console.log('Update response:', saveResponse.data);
      toast.showSuccess('Show Updated', 'The show has been successfully updated');
    } else {
      // If we're adding a new show
      console.log('POST request to:', SHOW_URL, 'with data:', apiData);
      saveResponse = await axios.post(SHOW_URL, apiData);
      console.log('Create response:', saveResponse.data);
      
      // Extract the show data from the response
      if (saveResponse.data && saveResponse.data.data && saveResponse.data.data.id) {
        toast.showSuccess('Show Added', `The new show has been successfully added with ID: ${saveResponse.data.data.id}`);
      } else {
        toast.showSuccess('Show Added', 'The new show has been successfully added');
      }
    }
    
    // Refresh the shows list
    await fetchShows();
    
    closeForm();
  } catch (error) {
    console.error('Error saving show:', error);
    
    // Detailed error logging
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.data && error.response.data.message) {
        toast.showError('API Error', error.response.data.message);
        return;
      }
    }
    
    const action = showData.id ? 'update' : 'add';
    toast.showApiError(error, `Failed to ${action} show`);
  }
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
    searchTerm: "",
    tag: "",
    minRating: 0,
    sortBy: "title",
    sortOrder: "asc",
  };
};

// Lifecycle hooks
onMounted(async () => {
  try {
    // First attempt
    await fetchShows();
  } catch (error) {
    console.error('Initial fetch failed, will retry in 2 seconds:', error);
    toast.showWarning('Connection Issue', 'Attempting to connect to API server...');
    
    // Wait 2 seconds and retry
    setTimeout(async () => {
      try {
        await fetchShows();
      } catch (retryError) {
        console.error('Retry failed:', retryError);
        toast.showError('Connection Failed', 'Could not connect to API server. Please check if it is running.');
      }
    }, 2000);
  }
});
</script>

<style>
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
  min-height: 75dvh;
  width: 100%;
  padding-bottom: 40px;
}

main {
  display: flex;
  flex-grow: 1;
  gap: 20px;
  height: 100%;
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
  max-height: 75dvh;
  overflow-y: auto;
  z-index: 5;
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
}
</style>
