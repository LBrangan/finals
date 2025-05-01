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
const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible', 'theme'])

// Toggle Theme
const theme = ref('light')
const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  emit('theme', theme.value)
}

onMounted(async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
  isMobileLogged.value = mobile.value && isLoggedIn.value
  isDesktop.value = !mobile.value && (isLoggedIn.value || !isLoggedIn.value)
})
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        :color="theme === 'light' ? 'amber darken-3' : 'blue-grey darken-3'"
        border
      >
        <v-app-bar-nav-icon
          v-if="props.isWithAppBarNavIcon"
          icon="mdi-menu"
          :theme="theme"
          @click="$emit('isDrawerVisible')"
        >
        </v-app-bar-nav-icon>

        <v-btn
          class="ms-auto"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onToggleTheme"
        >
        </v-btn>
        <TopProfileNavigation v-if="isLoggedIn"></TopProfileNavigation>
      </v-app-bar>

      <v-main :class="{ 'with-drawer': isLoggedIn }">
        <v-container fluid class="bg-amber-lighten-2 fill-height">
          <slot name="content"></slot>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
