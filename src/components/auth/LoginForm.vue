<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)
const isFormValid = ref(false)
const loading = ref(false)
const form = ref(null)
const toast = useToast()

const emit = defineEmits(['submit', 'update:valid'])

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    loading.value = true
    try {
      emit('submit', { email: email.value, password: password.value })
      toast.success('Login successful!')
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Please try again.')
    } finally {
      loading.value = false
    }
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
      :disabled="loading"
      hide-details="auto"
    ></v-text-field>

    <!-- Password Field -->
    <v-text-field
      v-model="password"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      label="Password"
      variant="outlined"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="mb-3"
      prepend-inner-icon="mdi-lock"
      :rules="rules.password"
      :disabled="loading"
      hide-details="auto"
    ></v-text-field>

    <!-- Login Button -->
    <v-btn
      color="orange"
      class="white--text mb-3 font-weight-bold"
      block
      type="submit"
      :loading="loading"
      :disabled="!isFormValid || loading"
      prepend-icon="mdi-login"
    >
      {{ loading ? 'Logging in...' : 'Log-in' }}
    </v-btn>
  </v-form>
</template>
