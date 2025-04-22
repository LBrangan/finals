<script setup>
import backgroundImg from '@/assets/background.jpg'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProfile() {
  router.push('/profiles').catch((err) => {
    console.error('Navigation error:', err)
  })
}
</script>

<template>
  <v-app>
    <v-main class="fill-height main-bg">
      <v-container fluid class="fill-height">
        <!-- Header Section -->
        <v-app-bar app color="yellow darken-2" dense>
          <v-toolbar-title class="text-h5 font-weight-bold">
            Welcome to LearnMate!
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="yellow darken-2"
            icon
            class="ma-4 elevation-4 profile-btn"
            @click="goToProfile"
          >
            <v-icon size="32">mdi-account-circle</v-icon>
          </v-btn>
        </v-app-bar>

        <!-- Main Content Section -->
        <v-row align="center" justify="center" class="text-center fill-height">
          <v-col cols="12" md="6">
            <img
              :src="backgroundImg"
              alt="Background showing tutoring theme"
              class="mb-6 logo-img"
            />

            <!-- Cards for Actions -->
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="elevation-3 action-card">
                  <v-card-title class="justify-center">
                    <v-icon size="48" color="orange">mdi-account-search</v-icon>
                  </v-card-title>
                  <v-card-subtitle class="text-center mb-4">
                    Find the perfect tutor for your needs
                  </v-card-subtitle>
                  <v-btn
                    color="orange"
                    class="text-black text-h6"
                    block
                    height="60"
                    rounded="xl"
                    :to="'/profiles'"
                  >
                    Find Tutors
                  </v-btn>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="elevation-3 action-card">
                  <v-card-title class="justify-center">
                    <v-icon size="48" color="orange">mdi-calendar-check</v-icon>
                  </v-card-title>
                  <v-card-subtitle class="text-center mb-4">
                    View and manage your tutoring sessions
                  </v-card-subtitle>
                  <v-btn
                    color="orange"
                    class="text-black text-h6"
                    block
                    height="60"
                    rounded="xl"
                    :to="'/booking'"
                  >
                    My Sessions
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.main-bg {
  background-color: #ffd54f;
}
.logo-img {
  max-width: 300px;
}
.profile-btn {
  border-radius: 50%;
}
.v-btn {
  transition: 0.2s ease;
}
.v-btn:hover {
  transform: scale(1.05);
}
.action-card {
  padding: 16px;
  border-radius: 12px;
  transition: 0.3s ease;
}
.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
