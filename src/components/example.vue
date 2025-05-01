<script setup>
import { ref, watch } from 'vue';
const userId = ref(1);
const userData = ref(null);
watch(userId, async (newId) => {
  // Al cambiar userId, traigo datos de la API
  userData.value = await fetch(`/api/users/${newId}`).then(r => r.json());
});
</script>


