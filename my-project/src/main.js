import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import '@/assets/fonts/fonts.css';


const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');