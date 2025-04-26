<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

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

const email = ref('')
const password = ref('')
const isFormValid = ref(false)
const loading = ref(false)
const error = ref('')

const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
]
const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => v.length >= 6 || 'Password must be at least 6 characters',
]

const router = useRouter()

async function handleSubmit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  try {
    // Simulated login - replace with actual API call
    const user = {
      email: email.value,
      id: Date.now(),
      name: email.value.split('@')[0],
    }

    // Store user data
    localStorage.setItem('user', JSON.stringify(user))

    // Navigate to dashboard
    await router.push('/dashboard')
  } catch (err) {
    error.value = 'Invalid email or password'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row justify="center">
        <v-col
          :cols="isMobile ? 12 : 8"
          :md="8"
          :lg="6"
          :class="{ 'text-center': !isMobile, 'd-none': isMobile && !isFormValid }"
        >
          <img src="@/assets/background.jpg" alt="Logo" />
        </v-col>

        <v-col
          :cols="isMobile ? 12 : 4"
          :md="4"
          :class="isMobile ? 'px-4' : ''"
          :p="isMobile ? 3 : 5"
        >
          <v-card class="pa-6" elevation="2" rounded="lg">
            <v-row justify="center">
              <v-col cols="12" class="text-center">
                <h1 class="mt-2 font-weight-bold">Welcome Back</h1>
                <h2 class="mt-2 mb-2 text-subtitle-2">Sign in to your account!</h2>
              </v-col>
            </v-row>

            <v-alert v-if="error" type="error" class="mb-4" density="compact" closable>
              {{ error }}
            </v-alert>

            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                label="Email address"
                variant="outlined"
                class="mb-3"
                type="email"
                prepend-inner-icon="mdi-email"
                :rules="emailRules"
                required
              />

              <v-text-field
                v-model="password"
                label="Password"
                variant="outlined"
                type="password"
                class="mb-3"
                prepend-inner-icon="mdi-lock"
                :rules="passwordRules"
                required
              />

              <v-btn
                color="orange"
                class="white--text mb-3 font-weight-bold"
                block
                type="submit"
                :loading="loading"
                :disabled="loading"
              >
                Sign In
              </v-btn>
            </v-form>

            <v-col class="text-center">
              Don't have an account?
              <RouterLink
                to="/register"
                class="text-decoration-none font-weight-bold text-orange text--darken-3"
              >
                Sign Up
              </RouterLink>
            </v-col>

            <v-col class="text-center">
              <a href="#" class="text-decoration-none font-weight-bold" style="color: black">
                Forgot Password?
              </a>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
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

@media (max-width: 960px) {
  .v-col {
    padding: 12px !important;
  }
}
</style>
