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
      </v-row>

      <v-btn
        color="orange"
        class="white--text mb-3 font-weight-bold"
        prepend-icon="mdi-account-plus"
        type="submit"
        :loading="formAction.formProcess"
        :disabled="formAction.formProcess"
        block
      >
        Register
      </v-btn>
    </v-form>
  </v-col>
</template>

<style scoped>
.v-text-field {
  border-radius: 8px;
}
</style>
