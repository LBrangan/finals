import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import ProfilesView from '@/views/system/ProfilesView.vue'
import BookingView from '@/views/system/BookingView.vue'
import SessionsView from '@/components/SessionsView.vue'
import { supabase } from '@/utils/supabase.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { public: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { public: true },
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
      path: '/bookings',
      name: 'bookings',
      component: BookingView,
      meta: { requiresAuth: true },
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: SessionsView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // Check if route is public
  if (to.meta.public) {
    return next()
  }

  // Get current session
  const {
    data: { session },
    error: console,
  } = await supabase.auth.getSession()

  // Redirect to login if no session and route requires auth
  if (!session && to.meta.requiresAuth) {
    return next('/')
  }

  // If we have a session, proceed with profile check
  if (session) {
    try {
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('role, id')
        .eq('id', session.user.id)
        .maybeSingle()

      // Handle profile fetch errors
      if (profileError) {
        console.error('Profile fetch error:', profileError)
        return next('/dashboard')
      }

      // If route requires specific role
      if (to.meta.role) {
        if (!userProfile || userProfile.role !== to.meta.role) {
          console.warn('Access denied: Incorrect role')
          return next('/dashboard')
        }
      }
    } catch (error) {
      console.error('Navigation error:', error)
      return next('/dashboard')
    }
  }

  return next()
})

export default router
