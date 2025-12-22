import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes from './publicRoutes';
import SuperAdminRoutes from './superAdminRoutes';
import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';

const routes = [
...publicRoutes,
...SuperAdminRoutes,
...adminRoutes,
...userRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
