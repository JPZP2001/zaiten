import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify()

import App from './App.vue'
import router from './router'

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
