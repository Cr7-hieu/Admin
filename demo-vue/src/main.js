import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './assets/main.css'

import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'


const app = createApp(App)

app.use(createPinia())

app.use(FloatingVue)
app.mount('#app')
