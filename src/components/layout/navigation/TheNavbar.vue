<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { supabase } from '@/utils/supabase'

const router = useRouter()
const authStore = useAuthUserStore()
const drawer = ref(false)
const menu = ref(false)

const handleLogout = async () => {
  await supabase.auth.signOut()
  authStore.$reset()
  router.push('/')
}

// Get avatar initials
const getInitials = () => {
  if (!authStore.userData?.firstname) return 'U'
  return `${authStore.userData.firstname[0]}${authStore.userData.lastname?.[0] || ''}`
}
</script>

<template>
  <!-- Header Section -->
  <v-app-bar app color="yellow-lighten-1" elevation="2">
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-h6 font-weight-bold">LearnMate</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Desktop Navigation -->
    <div class="d-none d-md-flex align-center">
      <v-btn text class="mx-2" to="/dashboard">
        <v-icon start>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
      <v-btn text class="mx-2" to="/sessions">
        <v-icon start>mdi-calendar</v-icon>
        Sessions
      </v-btn>
      <v-btn text class="mx-2" to="/profiles">
        <v-icon start>mdi-account-search</v-icon>
        Tutors
      </v-btn>

      <!-- Profile Menu -->
      <v-menu v-model="menu" :close-on-content-click="false" location="bottom end">
        <template v-slot:activator="{ props }">
          <v-btn
            class="ml-4 profile-btn"
            v-bind="props"
            size="large"
            color="amber-darken-2"
          >
            <v-avatar color="amber-darken-3" size="32">
              <span class="text-white">{{ getInitials() }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card min-width="300" class="mt-2">
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="amber-darken-3" size="40">
                  <span class="text-white">{{ getInitials() }}</span>
                </v-avatar>
              </template>
              <v-list-item-title class="text-subtitle-1 font-weight-medium">
                {{ authStore.userData?.firstname }} {{ authStore.userData?.lastname }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ authStore.userData?.email }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item to="/account/profile" prepend-icon="mdi-account-outline">
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
            
            <v-list-item to="/account/settings" prepend-icon="mdi-cog-outline">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item
              @click="handleLogout"
              prepend-icon="mdi-logout"
              color="red"
            >
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <!-- User Profile Section in Mobile -->
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar color="amber-darken-3" size="40">
            <span class="text-white">{{ getInitials() }}</span>
          </v-avatar>
        </template>
        <v-list-item-title>{{ authStore.userData?.firstname }} {{ authStore.userData?.lastname }}</v-list-item-title>
        <v-list-item-subtitle>{{ authStore.userRole }}</v-list-item-subtitle>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <!-- Navigation Items -->
      <v-list-item to="/dashboard" prepend-icon="mdi-view-dashboard">Dashboard</v-list-item>
      <v-list-item to="/sessions" prepend-icon="mdi-calendar">Sessions</v-list-item>
      <v-list-item to="/profiles" prepend-icon="mdi-account-search">Tutors</v-list-item>
      
      <v-divider class="my-2"></v-divider>

      <!-- Settings and Logout -->
      <v-list-item to="/account/profile" prepend-icon="mdi-account-outline">My Profile</v-list-item>
      <v-list-item to="/account/settings" prepend-icon="mdi-cog-outline">Settings</v-list-item>
      <v-list-item @click="handleLogout" prepend-icon="mdi-logout" color="red">Sign Out</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.profile-btn {
  border-radius: 50%;
}

.v-list-item {
  min-height: 44px;
}

.v-list-item__prepend {
  padding-inline-end: 12px;
}
</style>
