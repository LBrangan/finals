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
const isSuperAdmin = authStore.userRole === 'Super Administrator'
const isDrawerVisible = ref(mobile.value ? false : true)
const theme = ref(localStorage.getItem('theme') ?? 'light')

// On Theme Update
const onThemeUpdate = (value) => {
  theme.value = value
}
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    :transparent="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
    @theme="onThemeUpdate"
  >
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col cols="12" :md="isSuperAdmin ? 7 : false">
            <WelcomeWidget :theme="theme"></WelcomeWidget>
          </v-col>
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

.feature-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

/* Add background blur effect for transparent navbar */
::v-deep(.v-app-bar) {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.7) !important;
}
</style>
