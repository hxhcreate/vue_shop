import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'

import * as icons from '@element-plus/icons-vue'

import './assets/css/global.css'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//请求拦截  先预处理
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')

  return config
})

const app = createApp(App)
app.config.globalProperties.$http = axios
Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})
installElementPlus(app)
app.use(router).mount('#app')
