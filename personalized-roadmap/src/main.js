import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 1. Add this import

const app = createApp(App)

app.use(router) // 2. Add this line to connect the router

app.mount('#app')
