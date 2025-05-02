<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const isMobile = ref(window.innerWidth < 960)
const isFormValid = ref(false)

const updateMobile = () => {
  isMobile.value = window.innerWidth < 960
}

const handleSubmit = () => {
  // Add login logic here
  router.push('/dashboard')
}

onMounted(() => {
  window.addEventListener('resize', updateMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMobile)
})
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="login-container">
        <v-row justify="center" align="center" class="fill-height">
          <!-- Left Column - Image -->
          <v-col
            :cols="isMobile ? 12 : 8"
            :md="8"
            :lg="6"
            :class="{ 'text-center': !isMobile, 'd-none': isMobile }"
          >
            <img src="/images/background.jpg" alt="Logo" class="login-image" />
          </v-col>

          <!-- Right Column - Login Form -->
          <v-col
            :cols="isMobile ? 12 : 4"
            :md="4"
            :class="isMobile ? 'px-4' : ''"
            :p="isMobile ? 3 : 5"
          >
            <v-card class="pa-6 auth-card" elevation="2" rounded="lg">
              <v-row justify="center">
                <v-col cols="12" class="text-center">
                  <h1 class="mt-2 font-weight-bold">Welcome Back</h1>
                  <h2 class="mt-2 mb-2 text-subtitle-2">Sign in to your account!</h2>
                </v-col>
              </v-row>

              <LoginForm @submit="handleSubmit" v-model:valid="isFormValid"></LoginForm>

              <!-- Sign Up Link -->
              <v-col class="text-center">
                Don't have an account?
                <RouterLink to="/register" class="signup-link">Sign Up</RouterLink>
              </v-col>
            </v-card>

            <!-- Forgot Password Link -->
            <v-col class="text-center">
              <a href="#" class="text-decoration-none font-weight-bold" style="color: black">
                Forgot Password?
              </a>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.signup-link {
  color: #f57c51 !important;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  margin-left: 4px;
  transition: all 0.3s ease;
}

.forgot-link {
  color: rgba(0, 0, 0, 0.6) !important;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.fill-height {
  min-height: 100vh;
}

.login-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

@media (max-width: 960px) {
  .v-col {
    padding: 12px !important;
  }
}
</style>
