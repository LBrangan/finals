import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/auth/DashboardView.vue'
import ProfilesView from '@/views/auth/ProfilesView.vue'
import BookingView from '@/views/auth/BookingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },

    {
      path: '/profiles',
      name: 'profiles',
      component: ProfilesView,
      meta: { requiresAuth: true },
    },

    {
      path: '/booking',
      name: 'booking',
      component: BookingView,
      alias: '/bookings', // Add an alias for the plural form
      meta: { requiresAuth: true },
    },

    // Add a catch-all route for 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// Add navigation guard
router.beforeEach((to, from, next) => {
  // Simple auth check - you might want to replace this with your actual auth logic
  const isAuthenticated = localStorage.getItem('user') !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
