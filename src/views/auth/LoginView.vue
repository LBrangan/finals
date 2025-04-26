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
const emailRules = [(v) => !!v || 'This field is required']
const passwordRules = [(v) => !!v || 'This field is required']
const router = useRouter()

async function handleSubmit() {
  if (email.value && password.value) {
    router.push('/dashboard')
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

            <v-text-field
              v-model="email"
              label="Email address"
              variant="outlined"
              class="mb-3"
              type="email"
              prepend-inner-icon="mdi-email"
              :rules="emailRules"
              hide-details="auto"
            />

            <v-text-field
              v-model="password"
              label="Password"
              variant="outlined"
              type="password"
              class="mb-3"
              prepend-inner-icon="mdi-lock"
              :rules="passwordRules"
              hide-details="auto"
            />

            <v-btn
              color="orange"
              class="white--text mb-3 font-weight-bold"
              block
              @click="handleSubmit"
            >
              Sign In
            </v-btn>

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
