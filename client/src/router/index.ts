import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes from './publicRoutes';
import SuperAdminRoutes from './superAdminRoutes';
import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';
import { useAuthStore } from '@/stores/authStore';

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


router.beforeEach((to, from, next) => {


  const store = useAuthStore();

  const isLoggedIn = store.isUserLogin && !!store.userToken;
  const userRole = store.userRole;

  // Route requires authentication and role check
  if (to.meta.requiresAuth) {

    if (!isLoggedIn) {
      return next({ name: 'login' })
    }
    if (to.meta.role && to.meta.role !== userRole) {
      return next({ name: 'unauthorized' });
    }

    return next();
  }

  // Prevent logged-in users from accessing login page

  if (to.name === 'login' && isLoggedIn) {
    if (userRole === 'Super-Admin') {
      return next({name:'super-admin-dashboard',});
    }
    if (userRole === 'Admin') {
      return next({ name: 'admin-dashboard' });
    }
    return next({ name: 'user-dashboard' });
  }

  return next();

});

export default router
