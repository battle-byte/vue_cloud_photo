import './assets/main.css'
import VueQuillEditor from 'vue-quill-editor'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import 'virtual:windi.css'
import pinia from './stores/index'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
// import 'amfe-flexible'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.use(ArcoVue)
app.use(VueQuillEditor)
app.mount('#app')
