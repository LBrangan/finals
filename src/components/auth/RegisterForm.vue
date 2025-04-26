<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { ref } from 'vue'
import { useRegister } from '@/composables/auth/register'
import AlertNotification from '@/components/common/AlertNotification.vue'

defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const { formData, formAction, refVForm, onFormSubmit } = useRegister()

const isPasswordVisible = ref(false)
const loading = ref(false)
const form = ref(null)

const toast = useToast()
const router = useRouter()

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    loading.value = true
    try {
      // Add your registration logic here
      console.log('Form submitted:', formData.value)
      toast.success('Registration successful!')
      router.push('/') // Redirect to login page
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed. Please try again.')
    } finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <v-col :cols="props.isMobile ? 12 : 10" :md="6" :class="props.isMobile ? 'px-4' : 'mx-auto'">
    <v-card class="pa-4 pa-sm-6" elevation="2" rounded="lg">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1 class="mt-2 mb-4 font-weight-bold">Create Account</h1>
          <h2 class="mt-2 mb-4 text-subtitle-2">Create account to get started</h2>
        </v-col>
      </v-row>

      <v-form ref="form" @submit.prevent="handleSubmit">
        <v-row dense>
          <v-col cols="6">
            <v-text-field
              v-model="formData.firstName"
              label="First name"
              variant="outlined"
              prepend-inner-icon="mdi-account"
              :error-messages="errors.firstName"
              @input="errors.firstName = ''"
              :rules="[requiredValidator]"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="formData.lastName"
              label="Last name"
              variant="outlined"
              prepend-inner-icon="mdi-account"
              :error-messages="errors.lastName"
              @input="errors.lastName = ''"
              :rules="[requiredValidator]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-text-field
              v-model="formData.program"
              label="Program"
              variant="outlined"
              class="mb-3 mt-1"
              prepend-inner-icon="mdi-school"
              :error-messages="errors.program"
              @input="errors.program = ''"
              :rules="[requiredValidator]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          v-model="formData.email"
          label="Email address"
          variant="outlined"
          class="mb-3"
          type="email"
          prepend-inner-icon="mdi-email"
          :error-messages="errors.email"
          @input="errors.email = ''"
          :rules="[requiredValidator, emailValidator]"
        ></v-text-field>

        <v-text-field
          v-model="formData.password"
          label="Password"
          variant="outlined"
          :type="isPasswordVisible ? 'text' : 'password'"
          class="mb-3"
          prepend-inner-icon="mdi-lock"
          :error-messages="errors.password"
          @input="errors.password = ''"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :rules="[requiredValidator, passwordValidator]"
          hint="Minimum 8 characters"
        ></v-text-field>

        <v-text-field
          v-model="formData.confirmPassword"
          label="Confirm password"
          variant="outlined"
          :type="isPasswordVisible ? 'text' : 'password'"
          class="mb-3"
          prepend-inner-icon="mdi-lock"
          :error-messages="errors.confirmPassword"
          @input="errors.confirmPassword = ''"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :rules="[requiredValidator, (val) => confirmedValidator(val, formData.password)]"
          hint="Minimum 8 characters"
        ></v-text-field>

        <v-btn
          color="orange"
          class="white--text mb-3 font-weight-bold"
          block
          :loading="loading"
          @click="handleSubmit"
          :disabled="loading"
          prepend-icon="mdi-account-plus"
        >
          Register
        </v-btn>

        <v-col class="text-center">
          Already have an account?
          <RouterLink
            to="/"
            class="text-decoration-none font-weight-bold text-orange text--darken-3"
            >Sign In</RouterLink
          >
        </v-col>
      </v-form>
    </v-card>
  </v-col>
</template>
