import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import router from './router'
import Notifications from '@kyvg/vue3-notification'

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(Notifications)
  .mount('#app')
