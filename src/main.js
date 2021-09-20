import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueQuagga from 'vue-quaggajs';
import './registerServiceWorker'

createApp(App).use(store).use(router).use(VueQuagga).mount('#app')
