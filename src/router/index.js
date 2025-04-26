import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/auth/DashboardView.vue'
import ProfilesView from '@/views/auth/ProfilesView.vue'
import BookingView from '@/views/auth/BookingView.vue'
import SessionsView from '@/components/SessionsView.vue'

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
    },

    {
      path: '/profiles',
      name: 'profiles',
      component: ProfilesView,
    },

    {
      path: '/bookings',
      name: 'bookings',
      component: BookingView,
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: SessionsView,
    },
  ],
})

export default router
