import { reactive } from 'vue';
const user = reactive({ name: 'Ana', age: 30 });
user.age = 31; // Vue detecta el cambio automáticamente

