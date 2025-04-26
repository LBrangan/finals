<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'
import { useLogin } from '@/composables/auth/login'

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
      prepend-icon="mdi-login"
      type="submit"
      :loading="formAction.formProcess"
      :disabled="formAction.formProcess"
      block
    >
      Login
    </v-btn>
  </v-form>
</template>
