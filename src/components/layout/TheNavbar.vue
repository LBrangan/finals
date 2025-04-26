<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)
</script>

<template>
  <v-app-bar app color="orange-darken-2" dark elevation="2">
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title class="d-flex align-center cursor-pointer" @click="router.push('/dashboard')">
      <h3 class="text-h5 font-weight-bold mb-0">LearnMate</h3>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Desktop Navigation -->
    <div class="d-none d-md-flex align-center">
      <v-btn variant="text" class="mx-2" to="/dashboard">
        <v-icon start>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
      <v-btn variant="text" class="mx-2" to="/booking">
        <v-icon start>mdi-calendar</v-icon>
        Sessions
      </v-btn>
      <v-btn variant="text" class="mx-2" to="/profiles">
        <v-icon start>mdi-account-search</v-icon>
        Tutors
      </v-btn>
      <v-btn variant="text" class="mx-2" to="/">
        <v-icon start>mdi-logout</v-icon>
        Sign-out
      </v-btn>
    </div>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/dashboard" prepend-icon="mdi-view-dashboard">Dashboard</v-list-item>
      <v-list-item to="/booking" prepend-icon="mdi-calendar">Sessions</v-list-item>
      <v-list-item to="/profiles" prepend-icon="mdi-account-search">Tutors</v-list-item>
      <v-list-item to="/" prepend-icon="mdi-logout">Sign-out</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}

.v-toolbar-title:hover {
  opacity: 0.8;
}
</style>
