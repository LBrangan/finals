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

const { formData, formAction, refVForm, onFormSubmit } = useRegister()

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
</script>

<template>
  <AlertNotification
    :formSuccessMessage="formAction.formSuccessMessage"
    :formErrorMessage="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row dense>
      <!-- Personal Information -->
      <v-col cols="12">
        <v-row dense>
          <v-col cols="6">
            <v-text-field
              v-model="formData.firstName"
              label="First name"
              variant="outlined"
              class="mb-3"
              prepend-inner-icon="mdi-account"
              :rules="[requiredValidator]"
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="formData.lastName"
              label="Last name"
              variant="outlined"
              class="mb-3"
              prepend-inner-icon="mdi-account"
              :rules="[requiredValidator]"
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.program"
          label="Program"
          variant="outlined"
          class="mb-3"
          prepend-inner-icon="mdi-school"
          :rules="[requiredValidator]"
          hide-details="auto"
        ></v-text-field>
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
          hide-details="auto"
        ></v-text-field>
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
          hide-details="auto"
        ></v-text-field>
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
          hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-btn
      color="orange"
      class="white--text mt-4 mb-3 font-weight-bold"
      block
      :loading="formAction.formProcess"
      type="submit"
      :disabled="formAction.formProcess"
      prepend-icon="mdi-account-plus"
    >
      Register
    </v-btn>
  </v-form>
</template>
