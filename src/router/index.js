import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login"
  },
  {
    path: "/login",
    name:"Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
