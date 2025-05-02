<script setup>
import WelcomeWidget from '@/components/system/dashboard/WelcomeWidget.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

// Use Pinia Store
const authStore = useAuthUserStore()

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Load Variables
const isTutor = ref(authStore.userRole === 'Tutor')
const isTutee = ref(authStore.userRole === 'Tutee')
const isDrawerVisible = ref(!mobile.value)
const theme = ref(localStorage.getItem('theme') ?? 'light')

// Toggle drawer
const toggleDrawer = () => {
  isDrawerVisible.value = !isDrawerVisible.value
}

// On Theme Update
const onThemeUpdate = (value) => {
  theme.value = value
}
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    :transparent="true"
    @is-drawer-visible="toggleDrawer"
    @theme="onThemeUpdate"
  >
    <template #navigation>
      <SideNavigation v-model:isDrawerVisible="isDrawerVisible" />
    </template>

    <template #content>
      <v-container fluid>
        <v-row>
          <!-- Tutor View -->
          <template v-if="isTutor">
            <v-col cols="12">
              <WelcomeWidget :theme="theme"></WelcomeWidget>
            </v-col>
            <!-- Add more tutor specific components here -->
          </template>

          <!-- Tutee View -->
          <template v-if="isTutee">
            <v-col cols="12">
              <WelcomeWidget :theme="theme"></WelcomeWidget>
            </v-col>
            <!-- Add more tutee specific components here -->
          </template>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.v-container {
  background: linear-gradient(135deg, #ffd54f 0%, #ffecb3 100%);
  min-height: 100vh;
  padding: 20px;
}
</style>
