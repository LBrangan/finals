<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)
const isFormValid = ref(false)

const emit = defineEmits(['submit', 'update:valid'])

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { email: email.value, password: password.value })
  }
}

const rules = {
  email: [requiredValidator, emailValidator],
  password: [requiredValidator],
}
</script>

<template>
  <v-form
    ref="form"
    v-model="isFormValid"
    @submit.prevent="handleSubmit"
    @update:modelValue="emit('update:valid', $event)"
  >
    <!-- Email Field -->
    <v-text-field
      v-model="email"
      label="Email address"
      variant="outlined"
      class="mb-3"
      type="email"
      prepend-inner-icon="mdi-email"
      :rules="rules.email"
      hide-details="auto"
    ></v-text-field>

    <!-- Password Field -->
    <v-text-field
      v-model="password"
      label="Password"
      variant="outlined"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="mb-3"
      prepend-inner-icon="mdi-lock"
      :rules="rules.password"
      hide-details="auto"
      :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>

    <!-- Continue Button -->
    <v-btn
      color="orange"
      class="white--text mb-3 font-weight-bold"
      block
      type="submit"
      :disabled="!isFormValid"
      prepend-icon="mdi-login"
    >
      Log-in
    </v-btn>
  </v-form>
</template>
