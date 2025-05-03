<script setup>
import WelcomeWidget from '@/components/system/dashboard/WelcomeWidget.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Use Pinia Store and Router
const authStore = useAuthUserStore()
const router = useRouter()

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Load Variables
const isDrawerVisible = ref(!mobile.value)
const theme = ref(localStorage.getItem('theme') ?? 'light')

// Check user role and redirect if necessary
onMounted(() => {
  if (authStore.userRole === 'Tutor') {
    router.replace('/tutor/dashboard')
  }
})

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
    <template #content>
      <v-container fluid>
        <v-row>
          <!-- Tutee View Only -->
          <v-col cols="12">
            <WelcomeWidget :theme="theme"></WelcomeWidget>
          </v-col>
          <!-- Add more tutee specific components here -->
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
