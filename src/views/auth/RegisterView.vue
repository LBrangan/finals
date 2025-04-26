<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { ref, onMounted, onUnmounted } from 'vue'

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
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row justify="center" align="center" class="fill-height">
          <!-- Left Column - Image -->
          <v-col
            :cols="isMobile ? 12 : 8"
            :md="8"
            :lg="6"
            :class="{ 'text-center': !isMobile, 'd-none': isMobile }"
          >
            <img src="@/assets/background.jpg" alt="Logo" class="login-image" />
          </v-col>

          <!-- Right Column - Register Form -->
          <v-col
            :cols="isMobile ? 12 : 4"
            :md="4"
            :class="isMobile ? 'px-4' : ''"
            :p="isMobile ? 3 : 5"
          >
            <v-card class="pa-6" elevation="2" rounded="lg">
              <v-row justify="center">
                <v-col cols="12" class="text-center">
                  <h1 class="mt-2 font-weight-bold">Create Account</h1>
                  <h2 class="mt-2 mb-2 text-subtitle-2">Sign up to get started!</h2>
                </v-col>
              </v-row>

              <RegisterForm :isMobile="isMobile"></RegisterForm>

              <!-- Sign In Link -->
              <v-col class="text-center">
                Already have an account?
                <RouterLink
                  to="/"
                  class="text-decoration-none font-weight-bold text-orange text--darken-3"
                >
                  Sign In
                </RouterLink>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
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
