<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

const { formData, formAction, refVForm, onFormSubmit } = useLogin()

const isPasswordVisible = ref(false)
</script>

<template>
  <AlertNotification
    :formSuccessMessage="formAction.formSuccessMessage"
    :formErrorMessage="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          label="Email address"
          variant="outlined"
          class="mb-3"
          type="email"
          prepend-inner-icon="mdi-email"
          :rules="[requiredValidator, emailValidator]"
          :disabled="loading"
          hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Email Field -->

    <!-- Password Field -->
    <v-text-field
      v-model="password"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      label="Password"
      variant="outlined"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="mb-3"
      prepend-inner-icon="mdi-lock-outline"
      :rules="[requiredValidator]"
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
