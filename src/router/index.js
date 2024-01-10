import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Persons from '../views/PersonsView.vue'
import Register from '@/views/RegisterView.vue'
import Login from '@/views/LoginView.vue' // Importieren Sie die Login-Komponente

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login 
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/emailreminder',
    name: 'registerview',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/persons',
    name: 'Persons',
    component: Persons
  },
  {
    path: '/create-user',
    name: 'CreateUser',
    component: () => import('../views/CreateUserView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
