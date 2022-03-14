import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from './components/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: 'welcome', component: Welcome }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  else return next()
})
export default router
