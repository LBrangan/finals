<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

// Define props
const props = defineProps({
  selectedSubject: String,
  selectedDate: String,
  selectedTime: String,
  selectedLocation: String,
  agreeTerms: Boolean,
})

// Define emits
const emit = defineEmits(['confirm-booking', 'update-terms'])

// Local reactive state for terms agreement
const localAgreeTerms = ref(props.agreeTerms)

// Watch for changes in terms agreement
watch(localAgreeTerms, (newValue) => {
  emit('update-terms', newValue)
})

// Method to confirm the booking
const confirmBooking = () => {
  emit('confirm-booking')
}
</script>

<template>
  <h3>Confirm Your Booking</h3>
  <p>
    <strong>Subject:</strong> {{ props.selectedSubject }} <br />
    <strong>Date:</strong> {{ props.selectedDate }} <br />
    <strong>Time:</strong> {{ props.selectedTime }} <br />
    <strong>Location:</strong> {{ props.selectedLocation }}
  </p>
  <v-checkbox
    v-model="localAgreeTerms"
    label="I agree to the session terms and conditions"
  ></v-checkbox>
  <v-btn color="success" @click="confirmBooking" :disabled="!localAgreeTerms">
    Confirm Booking
  </v-btn>
</template>
