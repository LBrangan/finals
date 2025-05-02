<script setup>
import { supabase, formActionDefault } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

// Router setup
const router = useRouter()

// Store setup
const authStore = useAuthUserStore()

// Reactive refs
const formAction = ref({ ...formActionDefault })
const tab = ref(null)
const xs = ref(false) // Add breakpoint refs
const sm = ref(false)

// Computed navigation items based on user role
const navigationItems = computed(() => {
  if (authStore.userRole === 'Tutor') {
    return [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
      { title: 'My Sessions', icon: 'mdi-calendar-clock', to: '/sessions' },
      { title: 'Account Settings', icon: 'mdi-cog', to: '/account/settings' },
    ]
  }
  return [
    { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
    { title: 'Browse Tutors', icon: 'mdi-account-search', to: '/profiles' },
    { title: 'Book Session', icon: 'mdi-book-open-page-variant', to: '/bookings' },
    { title: 'My Sessions', icon: 'mdi-calendar-clock', to: '/sessions' },
  ]
})

// Logout handler
const onLogout = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  await supabase.auth.signOut()

  formAction.value.formProcess = false

  setTimeout(() => {
    authStore.$reset()
  }, 2500)

  router.replace('/')
}
</script>

<template>
  <v-app-bar elevation="1" color="amber-darken-2" class="app-bar">
    <!-- Logo -->
    <v-app-bar-icon>
      <v-app-bar-nav-icon>
        <v-img src="/images/navbar-logo.png" :width="xs ? '100%' : sm ? '40%' : '14%'"></v-img>
      </v-app-bar-nav-icon>
    </v-app-bar-icon>
    <v-app-bar-title class="title">LearnMate</v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Navigation Links -->
    <v-tabs v-model="tab" color="amber-darken-2" class="hidden-sm-and-down me-4">
      <v-tab v-for="item in navigationItems" :key="item.title" :to="item.to" :value="item.title">
        <v-icon start>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <!-- Profile Menu -->
    <v-menu min-width="280px" rounded offset="5" transition="scale-transition">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="profile-btn ms-auto">
          <v-avatar class="user-avatar" size="42 ">
            <v-img
              v-if="authStore.userData.image_url"
              :src="authStore.userData.image_url"
              alt="User Avatar"
            />
            <span v-else class="text-h6 font-weight-bold">
              {{ getAvatarText(authStore.userData.firstname + ' ' + authStore.userData.lastname) }}
            </span>
          </v-avatar>
        </v-btn>
      </template>

      <v-card class="mt-1 profile-menu">
        <v-card-text class="pa-4">
          <v-list>
            <v-list-item
              :subtitle="authStore.userData.email"
              :title="authStore.userData.firstname + ' ' + authStore.userData.lastname"
            >
              <template #prepend>
                <v-avatar class="user-avatar-large" size="56" color="amber">
                  <v-img
                    v-if="authStore.userData.image_url"
                    :src="authStore.userData.image_url"
                    alt="User Avatar"
                  />
                  <span v-else class="text-h5">
                    {{
                      getAvatarText(
                        authStore.userData.firstname + ' ' + authStore.userData.lastname,
                      )
                    }}
                  </span>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>

          <v-chip class="mt-2 role-chip" label>
            {{ authStore.userRole }}
          </v-chip>

          <v-divider class="my-3"></v-divider>

          <v-btn
            block
            prepend-icon="mdi-wrench"
            variant="outlined"
            color="amber-darken-2"
            class="menu-btn mb-2"
            to="/account/settings"
          >
            Account Settings
          </v-btn>

          <v-btn
            block
            prepend-icon="mdi-logout"
            variant="outlined"
            color="error"
            class="menu-btn"
            @click="onLogout"
            :loading="formAction.formProcess"
            :disabled="formAction.formProcess"
          >
            Logout
          </v-btn>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: 600;
}
.profile-btn {
  background-color: #f4f5ee;
  color: #e91313;
  border-radius: 100%;
  transition: all 0.3s ease;
}
.profile-btn:hover {
  background-color: #e91313;
  color: #f4f5ee;
  transform: translateY(-2px);
}

.user-avatar {
  background-color: #e91313;
  color: #f4f5ee;
}

.user-avatar span {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  letter-spacing: 1px;
  font-weight: 600;
}

.v-btn {
  color: #c57e65;
  font-weight: 500;
  transition: all 0.3s ease;
}

.v-btn:hover {
  background: rgba(245, 124, 81, 0.08);
  transform: translateX(4px);
}

.profile-menu {
  border-radius: 12px;
  overflow: hidden;
}

.role-chip {
  width: 100%;
  justify-content: center;
  background-color: #76e90aea;
  font-weight: 600;
}

.menu-btn {
  height: 44px;
  font-weight: 500;
  border-radius: 2px;
  text-transform: none;
}

.user-avatar-large {
  border: 3px solid rgba(252, 188, 88, 0.3);
  box-shadow: 0 2px 8px rgba(245, 124, 81, 0.15);
}

.v-tabs {
  max-width: fit-content;
  height: 64px;
}

.v-tab {
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.87); /* Add this for default text color */
}

.v-tab:hover {
  background: rgba(255, 193, 7, 0.1);
  color: #0c0401; /* Add this for hover text color */
}

.v-tab--selected {
  color: #000000 !important; /* Update this for selected tab text color */
  font-weight: 600; /* Optional: make selected tab text bold */
}

.me-4 {
  margin-right: 16px;
}

.app-bar {
  padding: 0 16px;
}
</style>
