import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import setupRouter from './router'
import { setupStore } from './stores'

const app = createApp(App)
setupRouter(app);
setupStore(app);
app.mount('#app');
