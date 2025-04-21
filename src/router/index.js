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
    },

    {
      path: '/profiles',
      name: 'profiles',
      component: ProfilesView,
    },

    {
      path: '/booking',
      name: 'booking',
      component: BookingView,
    },
  ],
})

export default router
