<script setup>
import TopProfileNavigation from '@/components/layout/navigation/TopProfileNavigation.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Use Pinia Store
const authStore = useAuthUserStore()

// Load Variables
const isLoggedIn = ref(false)
const isMobileLogged = ref(false)
const isDesktop = ref(false)

onMounted(async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
  isMobileLogged.value = mobile.value && isLoggedIn.value
  isDesktop.value = !mobile.value && (isLoggedIn.value || !isLoggedIn.value)
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
