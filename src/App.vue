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
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import FilterBar from "./components/FilterBar.vue";
import CardBoard from "./components/CardBoard.vue";
import CardForm from "./components/CardForm.vue";
import showsData from "./mockData/shows.json";

export default {
  name: "App",
  components: {
    AppHeader,
    FilterBar,
    CardBoard,
    CardForm,
  },
  data() {
    return {
      allShows: [],
      filters: {
        searchTerm: "",
        tag: "",
        minRating: 0,
        sortBy: "title",
        sortOrder: "asc",
      },
      isFormVisible: false,
      showBeingEdited: null,
    };
  },
  computed: {
    availableTags() {
      const tagsSet = new Set();
      this.allShows.forEach((show) => {
        show.tags?.forEach((tag) => tagsSet.add(tag));
      });
      return Array.from(tagsSet).sort();
    },
    filteredAndSortedShows() {
      let result = [...this.allShows];

      if (this.filters.searchTerm) {
        const term = this.filters.searchTerm.toLowerCase();
        result = result.filter(
          (show) =>
            show.title.toLowerCase().includes(term) ||
            show.description.toLowerCase().includes(term) ||
            (show.tags && show.tags.some(tag => tag.toLowerCase().includes(term)))
        );
      }

      if (this.filters.tag) {
        result = result.filter((show) => show.tags?.includes(this.filters.tag));
      }

      if (this.filters.minRating > 0) {
        result = result.filter((show) => show.rating >= this.filters.minRating);
      }

      result.sort((a, b) => {
        let valA = a[this.filters.sortBy];
        let valB = b[this.filters.sortBy];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA == null) return 1;
        if (valB == null) return -1;

        let comparison = 0;
        if (valA < valB) comparison = -1;
        if (valA > valB) comparison = 1;

        return this.filters.sortOrder === "asc" ? comparison : comparison * -1;
      });

      return result;
    },
  },
  methods: {
    fetchShows() {
      // Aquí cargo los datos desde mi archivo JSON
      this.allShows = showsData.map((show) => ({
        ...show,
        // Me aseguro de que todas las propiedades necesarias estén presentes
        tags: show.tags
          ? show.tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
          : [],
        releaseDate: show.releaseDate || show.year || "Unknown",
        rating: show.rating || 0,
        notes: show.notes || "",
        id: show.id || Date.now() + Math.floor(Math.random() * 1000),
      }));
    },
    deleteShow(showId) {
      this.allShows = this.allShows.filter((show) => show.id !== showId);
      if (this.showBeingEdited?.id === showId) {
        this.closeForm();
      }
    },
    saveShow(showData) {
      const index = this.allShows.findIndex((s) => s.id === showData.id);
      if (index !== -1) {
        this.allShows.splice(index, 1, showData);
      } else {
        if (!showData.id) showData.id = Date.now();
        this.allShows.push(showData);
      }
      this.closeForm();
    },
    openAddForm() {
      this.showBeingEdited = null;
      this.isFormVisible = true;
    },
    closeForm() {
      this.isFormVisible = false;
      this.showBeingEdited = null;
    },
    resetFilters() {
      this.filters = {
        searchTerm: "",
        tag: "",
        minRating: 0,
        sortBy: "title",
        sortOrder: "asc",
      };
    },
  },
  mounted() {
    this.fetchShows();
  },
};
</script>

<style>
/* Estilos conservados para la aplicación principal */
</style>
