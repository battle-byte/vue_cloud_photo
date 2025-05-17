import './assets/main.css'
import VueQuillEditor from 'vue-quill-editor'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import 'virtual:windi.css'
import pinia from './stores/index'
import  Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import  VueCropper  from 'vue-cropper'
import 'vue-cropper/dist/index.css'
// import 'amfe-flexible'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.use(Antd)
app.use(VueQuillEditor)
app.use(VueCropper)
app.mount('#app')
