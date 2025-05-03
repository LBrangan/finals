<script setup>
import { useSession } from '@/composables/useSession'

const props = defineProps({
  selectedSubject: String,
  selectedDate: String,
  selectedTime: String,
  selectedLocation: String,
  agreeTerms: Boolean,
  tutorId: String,
})

const emit = defineEmits(['confirm-booking', 'booking-error'])
const { createSession } = useSession()

const confirmBooking = async () => {
  try {
    await createSession({
      tutorId: props.tutorId,
      subjectId: props.selectedSubject,
      date: props.selectedDate,
      time: props.selectedTime,
    })
    emit('confirm-booking')
  } catch (error) {
    emit('booking-error', error)
  }
}
</script>

<template>
  <h3>Confirm Your Booking</h3>
  <p>
    <strong>Subject:</strong> {{ selectedSubject }} <br />
    <strong>Date:</strong> {{ selectedDate }} <br />
    <strong>Time:</strong> {{ selectedTime }} <br />
    <strong>Location:</strong> {{ selectedLocation }}
  </p>
  <v-checkbox
    v-model="localAgreeTerms"
    label="I agree to the session terms and conditions"
    @change="updateTerms"
  ></v-checkbox>
  <v-btn color="success" @click="confirmBooking" :disabled="!agreeTerms"> Confirm Booking </v-btn>
</template>
