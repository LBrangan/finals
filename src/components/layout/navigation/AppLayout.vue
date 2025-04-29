<script setup>
import { ref } from 'vue'

const theme = ref('light')
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
          <slot name="content"></slot>
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
</style>
