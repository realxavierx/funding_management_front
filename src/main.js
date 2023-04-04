import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import installElementPlus from './plugins/element'
import VueParticles from 'vue-particles'

const app = createApp(App)
installElementPlus(app)
app.config.globalProperties.$http = axios;
app.use(VueParticles)
app.use(store).use(router).mount('#app')