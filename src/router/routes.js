// Auth Views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

// System Views
import DashboardView from '@/views/system/DashboardView.vue'
import ProfilesView from '@/views/system/ProfilesView.vue'
import BookingView from '@/views/system/BookingView.vue'
import SessionsView from '@/components/system/bookings/SessionsView.vue'
import AccountSettingsView from '@/views/system/AccountSettingsView.vue'

export const routes = [
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
  {
    path: '/account/settings',
    name: 'account-settings',
    component: AccountSettingsView,
    meta: { requiresAuth: true },
  },
]
