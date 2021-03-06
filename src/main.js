import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import axios from '@/js/configAxios.js'

import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(store).use(router).mount('#app')
