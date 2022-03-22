import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'

import * as icons from '@element-plus/icons-vue'

import './assets/css/global.css'

import axios from 'axios'
//注册fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)


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
app.component('font-awesome-icon', FontAwesomeIcon)

installElementPlus(app)
app.use(router).mount('#app')
