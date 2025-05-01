import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser.js'
import { supabase } from '@/utils/supabase.js'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.public) {
    return next()
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && to.meta.requiresAuth) {
    return next('/')
  }

  if (session) {
    try {
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('role, id')
        .eq('id', session.user.id)
        .maybeSingle()

      if (profileError) {
        console.error('Profile fetch error:', profileError)
        return next('/dashboard')
      }

      const authStore = useAuthUserStore()
      if (!authStore.userData) {
        await authStore.getUserInformation()
      }

      if (to.meta.role && (!userProfile || userProfile.role !== to.meta.role)) {
        console.warn('Access denied: Incorrect role')
        return next('/dashboard')
      }
    } catch (error) {
      console.error('Navigation error:', error)
      return next('/dashboard')
    }
  }

  return next()
})

export default router
