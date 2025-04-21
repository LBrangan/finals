<script setup>
import { useRouter } from 'vue-router'

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
    <v-main class="fill-height" style="background-color: #ffd54f;">
      <v-container fluid class="fill-height">
        <v-row
          align="center"
          justify="center"
          class="text-center fill-height"
        >
          <v-col cols="12" md="6">
            <img
              src="@/assets/background.jpg"
              alt="Logo"
              class="mb-6"
              style="max-width: 300px"
            />

            <v-btn
              color="orange"
              class="my-4 text-black text-h6"
              block
              height="60"
              rounded="xl"
              @click="goToBrowseTutors"
            >
              Find Tutors
            </v-btn>

            <v-btn
              color="orange"
              class="my-4 text-black text-h6"
              block
              height="60"
              rounded="xl"
              @click="goToAppointments"
            >
              My Sessions
            </v-btn>
          </v-col>


          <!-- Profile Icon top-right -->
<v-col cols="12" class="d-flex justify-end px-6"  style="position: absolute; top: 0; right: 0;">
  <v-btn
  color="yellow darken-2"
  icon
  class="ma-4 elevation-4"
  style="border-radius: 50%;"
  @click="router.push('/profile')"
>
    <v-icon size="32" >mdi-account-circle</v-icon>
  </v-btn>
</v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-btn {
  transition: 0.2s ease;
}
</style>
