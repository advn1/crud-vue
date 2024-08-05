import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import $bus from "./utils/Events"
import $pages from './data'
import router from './router'

let app = createApp(App)

app.use(router)

// app.config.globalProperties.$pages = $pages
app.provide('$bus', $bus);
app.provide('$pages', $pages);

app.mount('#app')
