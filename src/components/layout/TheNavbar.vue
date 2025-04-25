<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)

function goToProfile() {
  router.push('/profiles').catch((err) => {
    console.error('Navigation error:', err)
  })
}
</script>

<template>
  <!-- Header Section -->
  <v-app-bar app color="yellow-lighten-1" elevation="2">
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title class="d-flex align-center">
      <h3 class="text-h6 font-weight-bold mb-0">LearnMate</h3>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Desktop Navigation -->
    <div class="d-none d-md-flex">
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
      <v-btn text class="mx-2" to="/">
        <v-icon start>mdi-logout</v-icon>
        Sign-out
      </v-btn>
    </div>
    <v-btn color="yellow-darken-3" icon class="ml-4 elevation-2 profile-btn" @click="goToProfile">
      <v-icon size="32">mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/dashboard" prepend-icon="mdi-view-dashboard"> Dashboard </v-list-item>
      <v-list-item to="/sessions" prepend-icon="mdi-calendar"> Sessions </v-list-item>
      <v-list-item to="/profiles" prepend-icon="mdi-account-search"> Tutors </v-list-item>
      <v-list-item to="/" prepend-icon="mdi-logout"> Sign-out </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.profile-btn {
  border-radius: 50%;
  background: rgba(252, 252, 252, 0.99);
}

.v-toolbar-title {
  cursor: pointer;
  transition: opacity 0.2s;
}

.v-toolbar-title:hover {
  opacity: 0.8;
}

.rounded-circle {
  border-radius: 50%;
}
</style>
