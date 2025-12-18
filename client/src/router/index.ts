import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import publicRoutes from './publicRoutes';


const routes = [
...publicRoutes,

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default router
