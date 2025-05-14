<template>
  <!-- Este es el layout principal de mi aplicación donde organizo todos los componentes -->
  <div id="app-layout">
    <!-- Coloco mi cabecera en la parte superior con mi nombre -->
    <AppHeader user-name="Luis Eduardo Urdaneta Martucci" />
    
    <!-- Añado la barra de filtros que me ayudará a buscar y ordenar los shows -->
    <FilterBar
      v-model="filters"
      @addShowRequest="openAddForm"
      @clearFilters="resetFilters"
      :tag-options="availableTags"
    />
    
    <!-- Este es el contenedor principal donde muestro mi contenido y formularios -->
    <main class="content-area">
      <div class="main-content">
        <!-- Aquí renderizo mi tablero de tarjetas con todos los shows filtrados -->
        <CardBoard :showList="filteredAndSortedShows" @deleteShow="deleteShow" />
      </div>
      
      <!-- Mi formulario para añadir o editar shows aparece condicionalmente -->
      <CardForm
        v-if="isFormVisible"
        :show-to-edit="showBeingEdited"
        @saveShow="saveShow"
        @cancelEdit="closeForm"
        class="sidebar-form"
      />
    </main>
    
    <!-- Componente para mostrar notificaciones toast al usuario -->
    <ToastMessage ref="toastRef" />
  </div>
</template>

<script setup>
// En este componente principal integro la lógica de toda mi aplicación
// Primero importo lo necesario de Vue y mis propios componentes
import { ref, computed, onMounted } from 'vue';
import axios from 'axios'; // Uso axios para las peticiones HTTP, es más simple que fetch
import AppHeader from "./components/AppHeader.vue";
import FilterBar from "./components/FilterBar.vue";
import CardBoard from "./components/CardBoard.vue";
import CardForm from "./components/CardForm.vue";
import ToastMessage from "./components/ToastMessage.vue";
import { useToast } from "./composables/useToast"; // Mi composable para mostrar notificaciones

// Configuro mis toasts para notificar al usuario
const toastRef = ref(null);
const toast = useToast();

// Defino el estado reactivo de mi aplicación
const allShows = ref([]); // Almaceno todos los shows que recibo de la API
const filters = ref({
        searchTerm: "", // Para búsquedas por texto
        tag: "",        // Para filtrar por categoría
        minRating: 0,   // Para filtrar por puntuación mínima
        sortBy: "title", // Campo por el que ordeno
        sortOrder: "asc", // Dirección del ordenamiento
});
const isFormVisible = ref(false); // Controla si el formulario está visible
const showBeingEdited = ref(null); // Guarda el show que estoy editando actualmente

// Defino las URLs de mi API para reutilizarlas
const SHOWS_URL = 'http://localhost:3000/shows'; // Para obtener todos los shows
const SHOW_URL = 'http://localhost:3000/show';   // Para operaciones con un show específico

// Propiedades computadas que se actualizan automáticamente cuando cambia el estado

// Extraigo todos los tags únicos de mis shows para el filtro
const availableTags = computed(() => {
      const tagsSet = new Set(); // Uso un Set para evitar duplicados
  allShows.value.forEach((show) => {
        show.tags?.forEach((tag) => tagsSet.add(tag));
      });
      return Array.from(tagsSet).sort(); // Convierto el Set a Array y lo ordeno
});

// Filtro y ordeno mis shows según los criterios seleccionados por el usuario
const filteredAndSortedShows = computed(() => {
  let result = [...allShows.value]; // Hago una copia para no modificar el original

  // Filtro por término de búsqueda (título, descripción o tags)
  if (filters.value.searchTerm) {
    const term = filters.value.searchTerm.toLowerCase();
        result = result.filter(
          (show) =>
            show.title.toLowerCase().includes(term) ||
            show.description.toLowerCase().includes(term) ||
            (show.tags && show.tags.some(tag => tag.toLowerCase().includes(term)))
        );
      }

  // Filtro por tag seleccionado
  if (filters.value.tag) {
    result = result.filter((show) => show.tags?.includes(filters.value.tag));
      }

  // Filtro por rating mínimo
  if (filters.value.minRating > 0) {
    result = result.filter((show) => show.rating >= filters.value.minRating);
      }

  // Ordeno según el criterio y dirección seleccionados
  result.sort((a, b) => {
    let valA = a[filters.value.sortBy];
    let valB = b[filters.value.sortBy];

    // Normalizo strings para comparación case-insensitive
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    // Manejo valores nulos o undefined
    if (valA == null) return 1;
    if (valB == null) return -1;

    // Comparación estándar
    let comparison = 0;
    if (valA < valB) comparison = -1;
    if (valA > valB) comparison = 1;

    // Invierto la comparación si el orden es descendente
    return filters.value.sortOrder === "asc" ? comparison : comparison * -1;
      });

      return result;
});

// Métodos para interactuar con la API y manejar la UI

// Función para obtener todos los shows de la API
const fetchShows = async () => {
  try {
    const response = await axios.get(SHOWS_URL);
    console.log('API Response:', response.data);
    
    // Aprendí que la API devuelve los datos dentro de un objeto data
    if (response.data && response.data.data) {
      const showsData = response.data.data;
      
      if (Array.isArray(showsData)) {
        // Transformo los datos para adaptarlos a mi aplicación
        allShows.value = showsData.map((show) => ({
        ...show,
        tags: show.tags
          ? show.tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
          : [],
        releaseDate: show.releaseDate || show.year || "Unknown",
        rating: show.rating || 0,
        notes: show.notes || "",
        }));
        
        // Notifico al usuario según los resultados
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
      // Manejo el caso donde la estructura no es la esperada
      console.error('Expected { data: [] } structure but got:', response.data);
      allShows.value = [];
      toast.showError('Data Format Error', 'API returned unexpected data structure');
    }
  } catch (error) {
    console.error('Error fetching shows:', error);
    allShows.value = [];
    
    // Proporciono mensajes específicos según el tipo de error
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      toast.showError('API Connection Failed', 'Cannot connect to API server. Make sure it is running on port 3000.');
    } else {
      toast.showApiError(error, 'Failed to load shows');
    }
    
    // Relanzamos el error para que pueda ser capturado en otro nivel
    throw error;
  }
};

// Función para eliminar un show
const deleteShow = async (showId) => {
  try {
    const deleteResponse = await axios.delete(`${SHOW_URL}/${showId}`);
    console.log('Delete response:', deleteResponse.data);
    
    // Actualizo la lista de shows
    await fetchShows();
    
    // Si estaba editando el show que acabo de eliminar, cierro el formulario
    if (showBeingEdited.value?.id === showId) {
      closeForm();
      }
    toast.showSuccess('Show Deleted', 'The show has been successfully deleted');
  } catch (error) {
    console.error('Error deleting show:', error);
    toast.showApiError(error, 'Failed to delete show');
  }
};

// Función para guardar un show (crear nuevo o actualizar existente)
const saveShow = async (showData) => {
  try {
    // Loggeo para depuración
    console.log('Preparing to send to API:', showData);
    
    // Validación de campos requeridos
    if (!showData.title || !showData.description || !showData.image || !showData.releaseDate) {
      const missingFields = [];
      if (!showData.title) missingFields.push('title');
      if (!showData.description) missingFields.push('description');
      if (!showData.image) missingFields.push('image');
      if (!showData.releaseDate) missingFields.push('releaseDate');
      
      toast.showError('Missing Fields', `Required fields missing: ${missingFields.join(', ')}`);
      return;
    }
    
    // Preparo los datos con los tipos correctos para la API
    const apiData = {
      ...showData,
      rating: Number(showData.rating) || 0,
      tags: Array.isArray(showData.tags) ? showData.tags : ['uncategorized'],
      // Formato de fecha como lo espera la API
      releaseDate: typeof showData.releaseDate === 'string' ? showData.releaseDate : new Date().toISOString().split('T')[0]
    };
    
    let saveResponse;
    
    // Determino si estoy actualizando o creando
    if (apiData.id) {
      // Actualización de un show existente
      console.log('PUT request to:', `${SHOW_URL}/${apiData.id}`);
      saveResponse = await axios.put(`${SHOW_URL}/${apiData.id}`, apiData);
      console.log('Update response:', saveResponse.data);
      toast.showSuccess('Show Updated', 'The show has been successfully updated');
    } else {
      // Creación de un nuevo show
      console.log('POST request to:', SHOW_URL, 'with data:', apiData);
      saveResponse = await axios.post(SHOW_URL, apiData);
      console.log('Create response:', saveResponse.data);
      
      // Muestro el ID en la notificación si está disponible
      if (saveResponse.data && saveResponse.data.data && saveResponse.data.data.id) {
        toast.showSuccess('Show Added', `The new show has been successfully added with ID: ${saveResponse.data.data.id}`);
      } else {
        toast.showSuccess('Show Added', 'The new show has been successfully added');
      }
    }
    
    // Recargo la lista de shows
    await fetchShows();
    
    // Cierro el formulario
    closeForm();
  } catch (error) {
    console.error('Error saving show:', error);
    
    // Loggeo detallado del error para depuración
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.data && error.response.data.message) {
        toast.showError('API Error', error.response.data.message);
        return;
      }
    }
    
    // Mensaje genérico con la acción que estaba intentando
    const action = showData.id ? 'update' : 'add';
    toast.showApiError(error, `Failed to ${action} show`);
  }
};

// Funciones para manejar la UI del formulario
const openAddForm = () => {
  showBeingEdited.value = null; // Reseteo el show en edición
  isFormVisible.value = true;    // Muestro el formulario
};

const closeForm = () => {
  isFormVisible.value = false;   // Oculto el formulario
  showBeingEdited.value = null;  // Limpio el show en edición
};

// Función para resetear todos los filtros a sus valores por defecto
const resetFilters = () => {
  filters.value = {
        searchTerm: "",
        tag: "",
        minRating: 0,
        sortBy: "title",
        sortOrder: "asc",
      };
};

// Ciclo de vida del componente
onMounted(async () => {
  try {
    // Primer intento de cargar los shows
    await fetchShows();
  } catch (error) {
    console.error('Initial fetch failed, will retry in 2 seconds:', error);
    toast.showWarning('Connection Issue', 'Attempting to connect to API server...');
    
    // Espero 2 segundos y reintento (útil si el servidor está arrancando)
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
/* Estilos principales de mi aplicación */

/* Contenedor principal con altura completa de la ventana */
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh; /* Uso dvh para viewport height dinámico (moderna propiedad CSS) */
  height: 100dvh;
  overflow-y: auto;
  padding: 0 20px;
}

/* Área de contenido principal donde van las tarjetas y el formulario */
.content-area {
  display: flex;
  flex-grow: 1;
  position: relative;
  gap: 20px; /* Espacio entre columnas */
  width: 100%;
  padding-bottom: 40px;
}

/* Estilos para el contenedor principal */
main {
  display: flex;
  flex-grow: 1;
  gap: 20px;
  width: 100%;
}

/* Contenedor para el grid de tarjetas */
.main-content {
  flex: 1;
  width: 100%;
}

/* Estilos para el formulario lateral */
.sidebar-form {
  width: 400px; /* Ancho fijo para el formulario */
  flex-shrink: 0; /* Evito que se encoja */
  transition: all 0.3s ease; /* Animación suave */
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
  position: sticky; /* Lo mantengo visible al hacer scroll */
  top: 20px;
  max-height: 75dvh; /* Limito la altura para que no ocupe toda la pantalla */
  overflow-y: auto; /* Agrego scroll si el contenido es muy largo */
  z-index: 5; /* Aseguro que esté por encima de otros elementos */
}

/* Media queries para hacer mi diseño responsive */
@media (max-width: 1200px) {
  .content-area {
    flex-direction: column; /* Apilo elementos verticalmente en pantallas pequeñas */
    min-height: auto;
  }

  .main-content {
    order: 2; /* Cambio el orden para que el formulario aparezca primero */
  }

  .sidebar-form {
    width: 100%; /* Ancho completo en móviles */
    position: static; /* Elimino posición sticky */
    max-height: none; /* Permito altura natural */
    margin-top: 0;
    margin-bottom: 20px;
    order: 1; /* Pongo el formulario antes que las tarjetas */
  }
}

/* Ajustes adicionales para móviles muy pequeños */
@media (max-width: 768px) {
  #app-layout {
    padding: 0 10px; /* Reduzco el padding lateral */
  }
  
  .content-area {
    padding-bottom: 20px; /* Reduzco el padding inferior */
  }
}
</style>
