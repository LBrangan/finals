<script setup>
import { ref, computed } from 'vue'
import TutorsView from './TutorsView.vue'
import SubjectSelector from '@/components/system/bookings/SubjectSelector.vue'
import DateSelector from '@/components/system/bookings/DateSelector.vue'
import BookingConfirmation from '@/components/system/bookings/BookingConfirmation.vue'

const currentStep = ref(1)
const selectedTutor = ref(null)
const selectedSubject = ref(null)
const selectedDate = ref(null)
const selectedTime = ref(null)
const agreeTerms = ref(false)

// Dummy tutors list
const tutors = ref([
  { id: 1, name: 'John Doe', expertise: 'Math' },
  { id: 2, name: 'Jane Smith', expertise: 'Science' },
])

const nextStep = () => {
  if (currentStep.value < 4) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const bookSession = () => {
  if (selectedDate.value && selectedTime.value && agreeTerms.value) {
    const booking = {
      tutor: selectedTutor.value,
      subject: selectedSubject.value,
      date: selectedDate.value,
      time: selectedTime.value,
    }

    localStorage.setItem('booking', JSON.stringify(booking))
    alert('Booking confirmed!')
    resetForm()
  }
}

const updateSubject = (subject) => {
  selectedSubject.value = subject
}

const resetForm = () => {
  currentStep.value = 1
  selectedTutor.value = null
  selectedSubject.value = null
  selectedDate.value = null
  selectedTime.value = null
  agreeTerms.value = false
}

const disableContinue = computed(() => {
  if (currentStep.value === 1) return !selectedTutor.value
  if (currentStep.value === 2) return !selectedSubject.value
  if (currentStep.value === 3) return !selectedDate.value || !selectedTime.value
  if (currentStep.value === 4) return !agreeTerms.value
  return false
})
</script>

<template>
  <div class="booking-wrapper">
    <v-card flat class="booking-card">
      <v-card-title class="text-h5 font-weight-bold">📚 Book a Tutoring Session</v-card-title>
      <v-divider class="my-4" />

      <v-window v-model="currentStep" class="mb-4">
        <v-window-item :value="1">
          <TutorsView :tutors="tutors" v-model:selectedTutor="selectedTutor" />
        </v-window-item>

        <v-window-item :value="2">
          <SubjectSelector
            :selectedTutor="selectedTutor"
            v-model:selectedSubject="selectedSubject"
            @update-subject="updateSubject"
          />
        </v-window-item>

        <v-window-item :value="3">
          <DateSelector v-model:selectedDate="selectedDate" v-model:selectedTime="selectedTime" />
        </v-window-item>

        <v-window-item :value="4">
          <BookingConfirmation
            :selectedSubject="selectedSubject"
            :selectedDate="selectedDate"
            :selectedTime="selectedTime"
          />
        </v-window-item>
      </v-window>

      <v-card-actions class="booking-nav">
        <v-btn color="grey-darken-1" variant="text" @click="prevStep" :disabled="currentStep === 1">
          <v-icon left>mdi-arrow-left</v-icon> Back
        </v-btn>

        <div class="d-flex align-center">
          <v-checkbox
            v-if="currentStep === 4"
            v-model="agreeTerms"
            label="I agree to the terms and conditions"
            class="mr-4"
            hide-details
          />
          <v-btn
            color="teal-darken-1"
            class="elevation-2"
            @click="currentStep === 4 ? bookSession() : nextStep()"
            :disabled="disableContinue"
          >
            {{ currentStep === 4 ? 'Confirm Booking' : 'Continue' }}
            <v-icon right>
              {{ currentStep === 4 ? 'mdi-check' : 'mdi-arrow-right' }}
            </v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.booking-wrapper {
  max-width: 850px;
  margin: 40px auto;
  padding: 1rem;
}

.booking-card {
  border-radius: 16px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background: #fffbe6;
}

.booking-card:hover {
  transform: scale(1.003);
}

.booking-nav {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 10;
  padding: 1rem;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
}

.v-btn {
  transition: all 0.2s ease;
}

.v-btn:hover {
  transform: scale(1.02);
}

.v-window {
  min-height: 300px;
}

.v-card-title {
  background: linear-gradient(to right, #ffe082, #fff8e1);
  border-radius: 12px;
  padding: 1rem;
}

.v-checkbox .v-label {
  font-size: 14px;
}
</style>
