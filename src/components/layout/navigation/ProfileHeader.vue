<script setup>
import { supabase, formActionDefault } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Utilize pre-defined vue functions
const router = useRouter()

// Use Pinia Store
const authStore = useAuthUserStore()

// Load Variables
const formAction = ref({
  ...formActionDefault,
})

// Logout Functionality
const onLogout = async () => {
  /// Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true }

  // Get supabase logout functionality
  await supabase.auth.signOut()

  formAction.value.formProcess = false
  // Reset State
  setTimeout(() => {
    authStore.$reset()
  }, 2500)
  // Redirect to homepage
  router.replace('/')
}
</script>

<template>
  <v-menu min-width="280px" rounded offset="5" transition="scale-transition">
    <template #activator="{ props }">
      <v-btn icon v-bind="props" class="profile-btn">
        <v-avatar class="user-avatar" size="42">
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
                    getAvatarText(authStore.userData.firstname + ' ' + authStore.userData.lastname)
                  }}
                </span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-chip
          class="mt-2 role-chip"
          :color="authStore.userRole === 'Tutor' ? 'amber-darken-2' : 'amber-lighten-2'"
          label
        >
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
</template>

<style scoped>
.profile-btn {
  margin-left: 8px;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  transform: scale(1.05);
}

.user-avatar {
  background: linear-gradient(135deg, #f57c51 0%, #fcbc58 100%);
  color: #f6f8e2;
  border: 2px solid rgba(252, 188, 88, 0.3);
  box-shadow: 0 2px 8px rgba(245, 124, 81, 0.15);
}

.user-avatar span {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  letter-spacing: 1px;
  font-weight: 600;
}

.v-card {
  border: 1px solid rgba(245, 124, 81, 0.1);
  background: rgba(246, 248, 226, 0.95) !important;
  backdrop-filter: blur(8px);
}

.v-list {
  background: transparent !important;
}

.v-btn {
  color: #f57c51;
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
  font-weight: 500;
  color: #2c3e50;
}

.menu-btn {
  height: 44px;
  font-weight: 500;
  border-radius: 8px;
  text-transform: none;
}

.user-avatar-large {
  border: 3px solid rgba(252, 188, 88, 0.3);
  box-shadow: 0 2px 8px rgba(245, 124, 81, 0.15);
}
</style>
