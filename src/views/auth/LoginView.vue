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
const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]
const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => v?.length >= 6 || 'Password must be at least 6 characters',
]

const form = ref(null)
const router = useRouter()
const isFormValid = ref(false)

async function handleSubmit() {
  const { valid } = await form.value.validate()

  if (valid) {
    console.log('Form is valid. Proceeding to dashboard...')
    router.push('/dashboard')
  } else {
    console.log('Form is invalid. Please correct the errors.')
  }
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row justify="center">
        <!-- Left Column -->
        <v-col
          :cols="isMobile ? 12 : 8"
          :md="8"
          :lg="6"
          :class="{ 'text-center': !isMobile, 'd-none': isMobile && !isFormValid }"
        >
          <img src="@/assets/background.jpg" alt="Logo" />
        </v-col>

        <!-- Right Column -->
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

            <LoginForm
              @submit="handleSubmit"
              :valid="isFormValid"
              @update:valid="(val) => (isFormValid = val)"
            />

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
            <a href="#" class="text-decoration-none font-weight-bold" style="color: black">
              Forgot Password?
            </a>
          </v-col>
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
