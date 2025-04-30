<script setup>
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
const isConfirmPasswordVisible = ref(false)
</script>

<template>
  <v-col cols="12" md="6" class="pa-8">
    <v-card class="pa-6 auth-card" elevation="2" rounded="lg">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1 class="mt-2 font-weight-bold">Create Account</h1>
          <h2 class="mt-2 mb-2 text-subtitle-2">Sign up for LearnMate!</h2>
        </v-col>
      </v-row>

      <AlertNotification
        :formSuccessMessage="formAction.formSuccessMessage"
        :formErrorMessage="formAction.formErrorMessage"
      />

      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-row dense>
          <v-col cols="6">
            <v-text-field
              v-model="formData.firstName"
              label="First name"
              variant="outlined"
              class="mb-3"
              prepend-inner-icon="mdi-account"
              :rules="[requiredValidator]"
              :disabled="formAction.formProcess"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="formData.lastName"
              label="Last name"
              variant="outlined"
              class="mb-3"
              prepend-inner-icon="mdi-account"
              :rules="[requiredValidator]"
              :disabled="formAction.formProcess"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formData.program"
              label="Program"
              variant="outlined"
              class="mb-3"
              prepend-inner-icon="mdi-school"
              :rules="[requiredValidator]"
              :disabled="formAction.formProcess"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formData.email"
              label="Email address"
              variant="outlined"
              class="mb-3"
              type="email"
              prepend-inner-icon="mdi-email"
              :rules="[requiredValidator, emailValidator]"
              :disabled="formAction.formProcess"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formData.password"
              label="Password"
              variant="outlined"
              class="mb-3"
              :type="isPasswordVisible ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              :rules="[requiredValidator, passwordValidator]"
              :disabled="formAction.formProcess"
              hide-details="auto"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="formData.confirmPassword"
              label="Confirm password"
              variant="outlined"
              class="mb-3"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
              :rules="[requiredValidator, (val) => confirmedValidator(val, formData.password)]"
              :disabled="formAction.formProcess"
              hide-details="auto"
            />
          </v-col>

          <!-- Add this inside your form, after the name fields -->
          <v-col cols="12">
            <v-select
              v-model="formData.role"
              label="Register as"
              variant="outlined"
              class="mb-3"
              prepend-inner-icon="mdi-account-convert"
              :items="[
                { title: 'Tutee', value: 'tutee' },
                { title: 'Tutor', value: 'tutor' },
              ]"
              :rules="[requiredValidator]"
              :disabled="formAction.formProcess"
              hide-details="auto"
            />
          </v-col>
        </v-row>

        <v-btn
          color="#F57C51"
          class="register-btn"
          prepend-icon="mdi-account-plus"
          type="submit"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
          block
        >
          Register
        </v-btn>
      </v-form>

      <!-- Sign In Link -->
      <v-col class="text-center">
        Already have an account?
        <RouterLink to="/" class="signin-link"> Sign In </RouterLink>
      </v-col>
    </v-card>
  </v-col>
</template>

<style scoped>
.register-btn {
  margin-top: 1rem;
  height: 48px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #f6f8e2 !important;
  transition: all 0.3s ease;
}

.register-btn:hover {
  background-color: #fcbc58 !important;
  transform: translateY(-2px);
}

.signin-link {
  color: #f57c51 !important;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.signin-link:hover {
  color: #fcbc58 !important;
  text-decoration: underline;
}
</style>
