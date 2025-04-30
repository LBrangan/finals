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
      <v-container fluid class="register-container">
        <v-row align="center" justify="center">
          <v-col :cols="isMobile ? 12 : 11" :sm="isMobile ? 12 : 11" :md="10" :lg="9">
            <v-row>
              <!-- Logo Section - Hide on small screens -->
              <v-col
                cols="12"
                md="6"
                :class="{ 'd-none': isMobile, 'd-md-flex': !isMobile }"
                class="align-center justify-center pa-8"
              >
                <img src="/images/background.jpg" alt="Logo" class="responsive-img" />
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
  background: #ffd54f;
  min-height: 100vh;
}

.v-col {
  transition: all 0.3s ease;
}

.responsive-img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(245, 124, 81, 0.15);
}
</style>
