<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const theme = ref('light')
const email = ref('')
const password = ref('')
const emailRules = [(v) => !!v || 'This field is required']
const passwordRules = [(v) => !!v || 'This field is required']

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}


</script>

<template>
  <v-app :theme="theme">
    <!-- Floating Dark Mode Toggle -->
    <v-btn
      icon
      :color="theme === 'light' ? 'yellow darken-3' : 'blue-grey darken-3'"
      @click="onClick"
      class="floating-toggle"
    >
      <v-icon>{{ theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-main>
      <v-container
        fluid
        class="bg-amber-lighten-2 d-flex align-center justify-center"
        style="min-height: 100vh"
      >
        <v-row justify="center">
          <!-- Left Column -->
          <v-col cols="12" md="8" lg="6" class="text-center">
            <img src="@/assets/background.jpg" alt="Logo" />
          </v-col>

          <!-- Right Column -->
          <v-col cols="12" md="4" p="5">
            <v-card class="pa-6" elevation="2" rounded="lg">
              <v-row justify="center">
                <v-col cols="12" class="text-center">
                  <h1 class="mt-2 font-weight-bold">Welcome Back</h1>
                  <h2 class="mt-2 mb-2 text-subtitle-2">Sign in to your account!</h2>
                </v-col>
              </v-row>

              <!-- Email Field -->
              <v-text-field
                v-model="email"
                label="Email address"
                variant="outlined"
                class="mb-3"
                type="email"
                prepend-inner-icon="mdi-email"
                :rules="emailRules"
                hide-details="auto"
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="password"
                label="Password"
                variant="outlined"
                type="password"
                class="mb-3"
                prepend-inner-icon="mdi-lock"
                :rules="passwordRules"
                hide-details="auto"
              ></v-text-field>

              <!-- Continue Button -->
              <v-btn
                color="orange"
                class="white--text mb-3 font-weight-bold"
                block
                :to="'/dashboard'"
                component="RouterLink"
              >
                Sign In
              </v-btn>

              <!-- Sign Up Link -->
              <v-col class="text-center">
                Don't have an account?
                <RouterLink
                  to="/register"
                  class="text-decoration-none font-weight-bold text-orange text--darken-3"
                >
                  Sign Up
                </RouterLink>
              </v-col>
            </v-card>

            <!-- Forgot Password Link -->
            <v-col class="text-center">
              <a href="#" class="text-decoration-none font-weight-bold" style="color: orange">
                Forgot Password?
              </a>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.floating-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.bg-amber-lighten-2 {
  background-color: #ffd54f !important; /* Adjust this color if needed */
}
</style>
