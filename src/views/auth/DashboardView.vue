<script setup>
import TheNavbar from '@/components/layout/TheNavbar.vue'
import { ref, onMounted } from 'vue'

const userName = ref('')
const greeting = ref('')

onMounted(() => {
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  userName.value = userData.name || 'Guest'

  // Set greeting based on time of day
  const hour = new Date().getHours()
  if (hour < 12) greeting.value = 'Good Morning'
  else if (hour < 18) greeting.value = 'Good Afternoon'
  else greeting.value = 'Good Evening'
})
</script>

<template>
  <v-app>
    <TheNavbar />
    <v-main class="fill-height main-bg">
      <v-container class="pt-8 pt-md-16 px-4">
        <!-- Welcome Section -->
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="12" md="8" class="welcome-section">
            <h1 class="text-h3 font-weight-bold mb-3 responsive-title">
              {{ greeting }}, {{ userName }}!
            </h1>
            <h2 class="text-h4 font-weight-bold mb-6 responsive-title">Welcome to LearnMate</h2>
            <p class="text-body-1 text-md-h6 text-grey-darken-2 mb-8">
              Your journey to academic excellence starts here. Find expert tutors and manage your
              learning sessions all in one place.
            </p>
          </v-col>
        </v-row>

        <!-- Main Content Section -->
        <v-row align="center" justify="center" class="text-center mt-4">
          <v-col cols="12" sm="10" md="8">
            <v-row>
              <v-col cols="12" sm="6" class="py-2">
                <v-card class="feature-card">
                  <v-card-item>
                    <v-icon size="64" color="orange" class="mb-4">mdi-account-search</v-icon>
                    <v-card-title class="text-h5 mb-3">Find Tutors</v-card-title>
                    <v-card-text class="text-body-1 mb-4">
                      Browse through our qualified tutors and find the perfect match for your
                      subject.
                    </v-card-text>
                    <v-btn
                      color="orange"
                      class="text-black text-h6"
                      block
                      height="56"
                      rounded="lg"
                      :to="'/profiles'"
                      aria-label="Browse Tutors"
                    >
                      Browse Tutors
                    </v-btn>
                  </v-card-item>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" class="py-2">
                <v-card class="feature-card">
                  <v-card-item>
                    <v-icon size="64" color="orange" class="mb-4">mdi-calendar-check</v-icon>
                    <v-card-title class="text-h5 mb-3">My Sessions</v-card-title>
                    <v-card-text class="text-body-1 mb-4">
                      View and manage your upcoming tutoring sessions in one place.
                    </v-card-text>
                    <v-btn
                      color="orange"
                      class="text-black text-h6"
                      block
                      height="56"
                      rounded="lg"
                      :to="'/sessions'"
                      aria-label="View Sessions"
                    >
                      View Sessions
                    </v-btn>
                  </v-card-item>
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
  background: linear-gradient(135deg, #ffd54f 0%, #ffecb3 100%);
}
.welcome-section {
  animation: fadeIn 0.8s ease-out;
}

.feature-card {
  height: 100%;
  padding: clamp(16px, 3vw, 24px);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
.v-btn {
  transition: all 0.2s ease;
}
.v-btn:hover {
  transform: scale(1.03);
}
.profile-btn {
  border-radius: 50%;
  background: rgba(255, 250, 250, 0.993);
}
.responsive-title {
  font-size: clamp(2rem, 5vw, 3rem) !important;
  line-height: 1.2;
}
@media (max-width: 600px) {
  .welcome-section {
    padding: 0 16px;
  }
  .feature-card {
    margin-bottom: 16px;
  }
  .v-btn {
    min-width: unset;
  }
}
/* Tablet adjustments */
@media (min-width: 601px) and (max-width: 960px) {
  .container {
    padding: 16px !important;
  }
}
/* Ensure cards stay readable on very small screens */
@media (max-width: 320px) {
  .feature-card {
    padding: 12px;
  }
  .v-card-title {
    font-size: 1.25rem !important;
  }
  .v-card-text {
    font-size: 0.875rem !important;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
