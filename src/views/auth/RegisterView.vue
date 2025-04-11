<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
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
            <v-col cols="12" md="4">
              <v-card class="pa-6" elevation="2" rounded="lg">
                <v-row justify="center">
                  <v-col cols="12" class="text-center">
                    <h1 class="mt-2 mb-4 font-weight-bold">Create Account</h1>
                    <h2 class="mt-2 mb-4 text-subtitle-2">Create account to get started</h2>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols-6>
                    <v-text-field
                      label="First name"
                      variant="outlined"
                      prepend-inner-icon="mdi-rename"
                      hide-details
                    ></v-text-field>
                  </v-col>

                  <v-col cols-6>
                    <v-text-field
                      label="Last name"
                      variant="outlined"
                      prepend-inner-icon="mdi-rename"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col>
                    <v-text-field
                      label="Program"
                      variant="outlined"
                      class="mb-3 mt-1"
                      prepend-inner-icon="mdi-rename"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-text-field
                  label="Email address"
                  variant="outlined"
                  class="mb-3"
                  prepend-inner-icon="mdi-email"
                  hide-details
                ></v-text-field>

                <v-text-field
                  label="Password"
                  variant="outlined"
                  type="password"
                  class="mb-3"
                  prepend-inner-icon="mdi-lock"
                  hide-details
                ></v-text-field>

                <v-text-field
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  class="mb-3"
                  prepend-inner-icon="mdi-lock"
                  hide-details
                ></v-text-field>

                <v-btn color="brown darken-3" class="white--text mb-3 font-weight-bold" block>
                  Continue
                </v-btn>

                <v-col class="text-center">
                  Already have an account?
                  <RouterLink
                    to="/"
                    class="text-decoration-none font-weight-bold text-brown text--darken-3"
                    >Sign In</RouterLink
                  >
                </v-col>
              </v-card>
            </v-col>
          </v-row>
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

.bg-amber-lighten-2 {
  background-color: #ffd54f; /* Adjust this color if needed */
}
</style>
