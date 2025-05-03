<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobile = ref(window.innerWidth < 960)
const updateMobile = () => {
  isMobile.value = window.innerWidth < 960
}

const navigateToTutorRegister = () => {
  router.push('/tutor-register')
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
      <v-container fluid class="register-container">
        <v-row align="center" justify="center" class="fill-height">
          <v-col :cols="isMobile ? 12 : 11" :sm="isMobile ? 12 : 11" :md="10" :lg="9">
            <v-row>
              <!-- Left Section with Image and Text -->
              <v-col
                cols="12"
                md="6"
                :class="{ 'd-none': isMobile, 'd-md-flex': !isMobile }"
                class="left-section align-center justify-center pa-8"
              >
                <div class="text-center">
                  <img src="/images/learnmate-logo.png" alt="Logo" class="responsive-img mb-8" />
                  <div class="welcome-text">
                    <h1 class="text-h4 font-weight-bold mb-4">Welcome to LearnMate!</h1>
                    <p class="text-body-1 mb-6">Find your perfect study companion!</p>
                    <v-btn
                      color="#F57C51"
                      size="large"
                      class="tutor-btn"
                      prepend-icon="mdi-school"
                      @click="navigateToTutorRegister"
                    >
                      Want to become a Tutor?
                    </v-btn>
                  </div>
                </div>
              </v-col>

              <!-- Form Section -->
              <RegisterForm :isMobile="isMobile"></RegisterForm>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.register-container {
  background: linear-gradient(135deg, #ffd54f 0%, #ffecb3 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.left-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

.welcome-text {
  text-align: center;
  color: #2c3e50;
}

.v-col {
  transition: all 0.3s ease;
}

.responsive-img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(245, 124, 81, 0.2);
  transition: transform 0.3s ease;
  opacity: 0.9;
}

.responsive-img:hover {
  transform: translateY(-5px);
}

.tutor-btn {
  height: 48px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #f6f8e2 !important;
  transition: all 0.3s ease;
  text-transform: none;
}

.tutor-btn:hover {
  background-color: #fcbc58 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 124, 81, 0.3);
}

@media (max-width: 960px) {
  .register-container {
    padding: 1rem;
  }
}
</style>
