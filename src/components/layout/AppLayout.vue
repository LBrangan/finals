<script setup>
import ProfileHeader from '@/components/layout/navigation/ProfileHeader.vue'
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

// Toggle Theme
const theme = ref('light')
function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
  isMobileLogged.value = mobile.value && isLoggedIn.value
  isDesktop.value = !mobile.value && (isLoggedIn.value || !isLoggedIn.value)
})

const drawerItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
  { title: 'Find Tutors', icon: 'mdi-account-search', to: '/profiles' },
  { title: 'Book a Session', icon: 'mdi-book-open-page-variant', to: '/bookings' },
  { title: 'My Sessions', icon: 'mdi-calendar-check', to: '/sessions' },
]
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-navigation-drawer
        v-if="isLoggedIn"
        v-model="isDrawerVisible"
        :rail="false"
        permanent
        color="amber-lighten-5"
      >
        <v-list>
          <v-list-item
            prepend-avatar="/images/learnmate-logo.png"
            title="LearnMate"
            subtitle="Learn Together, Grow Together"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, i) in drawerItems"
            :key="i"
            :value="item"
            :to="item.to"
            color="amber-darken-2"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-spacer></v-spacer>

      <v-btn
        icon
        :color="theme === 'light' ? 'yellow darken-3' : 'blue-grey darken-3'"
        @click="onClick"
        class="floating-toggle"
      >
        <v-icon>{{ theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <ProfileHeader v-if="isLoggedIn"></ProfileHeader>

      <v-main :class="{ 'with-drawer': isLoggedIn }">
        <v-container fluid class="bg-amber-lighten-2 fill-height">
          <slot name="content"></slot>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.floating-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
.with-drawer {
  padding-left: 256px;
}

@media (max-width: 960px) {
  .with-drawer {
    padding-left: 0;
  }
}

.v-navigation-drawer {
  transition: transform 0.3s ease;
}

.floating-toggle {
  margin: 0 12px;
  transition: transform 0.3s ease;
}

.floating-toggle:hover {
  transform: rotate(45deg);
}
</style>
