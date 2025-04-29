<script setup>
import AppLayout from '@/components/layout/navigation/AppLayout.vue'
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
                <img src="@/assets/background.jpg" alt="Logo" class="responsive-img" />
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
