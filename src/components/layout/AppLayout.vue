<script setup>
import TopProfileNavigation from '@/components/layout/navigation/TopProfileNavigation.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { mobile } = useDisplay()
const authStore = useAuthUserStore()

const isLoggedIn = ref(false)
const isMobileLogged = ref(false)
const isDesktop = ref(false)

const checkAuth = async () => {
  const authenticated = await authStore.isAuthenticated()
  isLoggedIn.value = authenticated
  isMobileLogged.value = mobile.value && authenticated
  isDesktop.value = !mobile.value && (authenticated || !authenticated)

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (authenticated && ['/', '/register', '/tutor-register'].includes(route.path)) {
    router.replace('/dashboard')
  }
}

// Watch for route changes
watch(() => route.path, checkAuth)

onMounted(async () => {
  await checkAuth()
})
</script>

<template>
  <v-responsive>
    <v-app class="bg-amber-lighten-2">
      <TopProfileNavigation v-if="isLoggedIn"></TopProfileNavigation>

      <v-main :class="{ 'with-drawer': isLoggedIn }">
        <v-container fluid class="bg-amber-lighten-2 fill-height">
          <slot name="content"></slot>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
