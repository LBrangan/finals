<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const isMobile = ref(window.innerWidth < 960)
const updateMobile = () => {
  isMobile.value = window.innerWidth < 960
}

onMounted(() => {
  window.addEventListener('resize', updateMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMobile)
})

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
const router = useRouter()

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
    console.log('Form submitted:', form.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row align="center" justify="center">
        <v-col :cols="isMobile ? 12 : 11" :sm="isMobile ? 12 : 11" :md="10" :lg="9">
          <v-row>
            <v-col
              cols="12"
              md="6"
              :class="{ 'd-none': isMobile, 'd-md-flex': !isMobile }"
              class="align-center justify-center pa-8"
            >
              <img src="@/assets/background.jpg" alt="Logo" class="responsive-img" />
            </v-col>

            <v-col :cols="isMobile ? 12 : 10" :md="6" :class="isMobile ? 'px-4' : 'mx-auto'">
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
                  :disabled="loading"
                  prepend-icon="mdi-account-plus"
                >
                  Register
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
    </template>
  </AppLayout>
</template>

<style scoped>
.bg-amber-lighten-2 {
  background-color: #ffd54f;
}

.fill-height {
  min-height: 100vh;
}
</style>
