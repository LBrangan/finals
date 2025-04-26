<script setup>
import { useRouter } from 'vue-router'
import TheNavbar from '@/components/layout/TheNavbar.vue'

const router = useRouter()

function goToBrowseTutors() {
  router.push('/profiles')
}

function goToAppointments() {
  router.push('/booking')
}
</script>

<template>
  <v-app>
    <TheNavbar />

    <v-main class="fill-height" style="background-color: #ffd54f">
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center" class="text-center fill-height">
          <v-col cols="12" md="6">
            <img
              src="@/assets/background.jpg"
              alt="Logo"
              class="mb-6 rounded-lg"
              style="max-width: 300px"
            />

            <div class="d-flex flex-column gap-4">
              <v-btn
                color="orange-darken-2"
                class="text-white text-h6 py-6"
                block
                height="60"
                rounded="xl"
                elevation="2"
                @click="goToBrowseTutors"
              >
                <v-icon start size="32">mdi-account-search</v-icon>
                Find Tutors
              </v-btn>

              <v-btn
                color="orange-darken-2"
                class="text-white text-h6 py-6"
                block
                height="60"
                rounded="xl"
                elevation="2"
                @click="goToAppointments"
              >
                <v-icon start size="32">mdi-calendar-clock</v-icon>
                My Sessions
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-btn {
  transition: all 0.3s ease;
}

.v-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.rounded-lg {
  border-radius: 16px;
}
</style>
