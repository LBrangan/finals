<script setup>
import { ref } from 'vue'

const theme = ref('light')
const form = ref({
  firstName: '',
  lastName: '',
  program: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({})
const loading = ref(false)

// Validation rules
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const validateForm = () => {
  errors.value = {}

  if (!form.value.firstName) errors.value.firstName = 'First name is required'
  if (!form.value.lastName) errors.value.lastName = 'Last name is required'
  if (!form.value.program) errors.value.program = 'Program is required'
  if (!form.value.email) errors.value.email = 'Email is required'
  else if (!emailPattern.test(form.value.email)) errors.value.email = 'Invalid email format'
  if (!form.value.password) errors.value.password = 'Password is required'
  else if (form.value.password.length < 6)
    errors.value.password = 'Password must be at least 6 characters'
  if (!form.value.confirmPassword) errors.value.confirmPassword = 'Please confirm password'
  else if (form.value.password !== form.value.confirmPassword)
    errors.value.confirmPassword = 'Passwords do not match'

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    // Add your registration logic here
    console.log('Form submitted:', form.value)
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}

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
        <v-container fluid class="bg-amber-lighten-2 fill-height">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="11" md="10" lg="9">
              <v-row>
                <!-- Logo Section - Hide on small screens -->
                <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center pa-8">
                  <img src="@/assets/background.jpg" alt="Logo" class="responsive-img" />
                </v-col>

                <!-- Form Section -->
                <v-col cols="12" sm="10" md="6" class="mx-auto">
                  <v-card class="pa-4 pa-sm-6" elevation="2" rounded="lg">
                    <v-row justify="center">
                      <v-col cols="12" class="text-center">
                        <h1 class="mt-2 mb-4 font-weight-bold">Create Account</h1>
                        <h2 class="mt-2 mb-4 text-subtitle-2">Create account to get started</h2>
                      </v-col>
                    </v-row>

                    <v-row dense>
                      <v-col cols="6">
                        <v-text-field
                          v-model="form.firstName"
                          label="First name"
                          variant="outlined"
                          prepend-inner-icon="mdi-rename"
                          :error-messages="errors.firstName"
                          @input="errors.firstName = ''"
                        />
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          v-model="form.lastName"
                          label="Last name"
                          variant="outlined"
                          prepend-inner-icon="mdi-rename"
                          :error-messages="errors.lastName"
                          @input="errors.lastName = ''"
                        />
                      </v-col>
                    </v-row>

                    <v-row dense>
                      <v-col>
                        <v-text-field
                          v-model="form.program"
                          label="Program"
                          variant="outlined"
                          class="mb-3 mt-1"
                          prepend-inner-icon="mdi-rename"
                          :error-messages="errors.program"
                          @input="errors.program = ''"
                        />
                      </v-col>
                    </v-row>

                    <v-text-field
                      v-model="form.email"
                      label="Email address"
                      variant="outlined"
                      class="mb-3"
                      prepend-inner-icon="mdi-email"
                      :error-messages="errors.email"
                      @input="errors.email = ''"
                    />

                    <v-text-field
                      v-model="form.password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      class="mb-3"
                      prepend-inner-icon="mdi-lock"
                      :error-messages="errors.password"
                      @input="errors.password = ''"
                    />

                    <v-text-field
                      v-model="form.confirmPassword"
                      label="Confirm password"
                      variant="outlined"
                      type="password"
                      class="mb-3"
                      prepend-inner-icon="mdi-lock"
                      :error-messages="errors.confirmPassword"
                      @input="errors.confirmPassword = ''"
                    />

                    <v-btn
                      color="orange"
                      class="white--text mb-3 font-weight-bold"
                      block
                      :loading="loading"
                      @click="handleSubmit"
                    >
                      Sign Up
                    </v-btn>

                    <v-col class="text-center">
                      Already have an account?
                      <RouterLink
                        to="/"
                        class="text-decoration-none font-weight-bold text-orange text--darken-3"
                        >Sign In</RouterLink
                      >
                    </v-col>
                  </v-card>
                </v-col>
              </v-row>
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
  background-color: #ffd54f;
}

.fill-height {
  min-height: 100vh;
}

.responsive-img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

@media (max-width: 600px) {
  .floating-toggle {
    top: 10px;
    right: 10px;
  }
}

.v-col {
  transition: all 0.3s ease;
}
</style>
