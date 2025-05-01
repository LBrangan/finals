<script setup>
import { navigationItems1 } from './sideNavigation'
import { useAuthUserStore } from '@/stores/authUser'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  isDrawerVisible: {
    type: Boolean,
    required: true,
  },
})

// Use composables
const { mobile } = useDisplay()
const authStore = useAuthUserStore()

// Navigation items
const navItems = ref(navigationItems1)

// Filter items based on role if needed
const filteredNavItems = ref(navItems.value)
</script>

<template>
  <v-navigation-drawer
    :model-value="props.isDrawerVisible"
    :persistent="mobile"
    :temporary="mobile"
    :permanent="!mobile"
    close-delay="2000"
    width="300"
    expand-on-hover
    rail
  >
    <!-- App Logo -->
    <v-list-item
      prepend-avatar="/images/learnmate-logo.png"
      title="LearnMate"
      subtitle="Learn Together, Grow Together"
    >
    </v-list-item>

    <v-divider></v-divider>

    <!-- Navigation Items -->
    <v-list nav>
      <v-list-item
        v-for="item in filteredNavItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        color="amber-darken-2"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.navigation-drawer {
  background: linear-gradient(180deg, #fff8e1 0%, #ffffff 100%);
}

.v-list-item {
  border-radius: 0;
  margin: 4px 8px;
  transition: all 0.3s ease;
}

.v-list-item:hover {
  background-color: rgba(255, 193, 7, 0.1);
}

.v-list-item--active {
  background-color: rgba(255, 193, 7, 0.2) !important;
}
</style>
