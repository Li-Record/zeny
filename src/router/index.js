import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/pages/Login.vue'
import Dashboard from '../components/pages/Dashboard.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: 'login',
  },
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    component: Dashboard,
  },
]

const router = new VueRouter({
  routes
})

export default router
