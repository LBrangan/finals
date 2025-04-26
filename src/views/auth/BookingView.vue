<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import SubjectSelector from '@/components/SubjectSelector.vue'
import DateSelector from '@/components/DateSelector.vue'
import BookingConfirmation from '@/components/BookingConfirmation.vue'

const router = useRouter()
const selectedSubject = ref(null)
const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedLocation = ref(null)
const agreeTerms = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const email = ref('')
const phone = ref('')
const additionalNotes = ref('')

const availableTimes = ['10:00 AM', '2:00 PM', '4:00 PM']

// Validation rules
const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const phoneRules = [
  (v) => !!v || 'Phone number is required',
  (v) => /^\d{10}$/.test(v) || 'Phone must be 10 digits',
]

function updateSubject(subject) {
  selectedSubject.value = subject
}

function updateTerms(value) {
  agreeTerms.value = value
}

function bookSession() {
  if (!selectedSubject.value || !email.value || !phone.value) {
    snackbar.value = true
    snackbarMessage.value = 'Please fill in all required fields'
    return
  }

  try {
    const newSession = {
      id: Date.now(),
      subject: selectedSubject.value,
      date: selectedDate.value,
      time: selectedTime.value,
      location: selectedLocation.value,
      email: email.value,
      phone: phone.value,
      notes: additionalNotes.value,
    }

    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]')
    sessions.push(newSession)
    localStorage.setItem('sessions', JSON.stringify(sessions))

    snackbar.value = true
    snackbarMessage.value = `Session booked successfully for ${selectedDate.value} at ${selectedTime.value}`
    setTimeout(() => router.push('/dashboard'), 2000)
  } catch {
    snackbar.value = true
    snackbarMessage.value = 'Failed to book session. Please try again.'
  }
}
</script>

<template>
  <v-app>
    <TheNavbar />
    <v-main class="booking-bg">
      <v-container fluid>
        <v-row class="justify-center">
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title>Book a Tutoring Session</v-card-title>
              <v-card-subtitle>
                Subject: Computer Science - 3rd Year | In-Person Tutoring
              </v-card-subtitle>

              <v-card-text>
                <v-form>
                  <!-- Subject Selection -->
                  <SubjectSelector
                    :selected-subject="selectedSubject"
                    @update-subject="updateSubject"
                  />

                  <!-- Date Selection -->
                  <DateSelector
                    :selected-subject="selectedSubject"
                    :selected-date="selectedDate"
                    :selected-time="selectedTime"
                    :selected-location="selectedLocation"
                    :agree-terms="agreeTerms"
                    @update-terms="updateTerms"
                    @confirm-booking="bookSession"
                  />

                  <v-select v-model="selectedTime" :items="availableTimes" label="Choose Time" />

                  <v-text-field v-model="email" label="Email*" :rules="emailRules" required />

                  <v-text-field
                    v-model="phone"
                    label="Phone Number*"
                    :rules="phoneRules"
                    required
                  />

                  <v-textarea v-model="additionalNotes" label="Additional Notes" rows="3" />

                  <!-- Booking Confirmation -->
                  <BookingConfirmation
                    :selected-subject="selectedSubject"
                    :selected-date="selectedDate"
                    :selected-time="selectedTime"
                    :selected-location="selectedLocation"
                    :agree-terms="agreeTerms"
                    @update-terms="updateTerms"
                    @confirm-booking="bookSession"
                  />
                </v-form>
              </v-card-text>
            </v-card>

            <v-snackbar
              v-model="snackbar"
              :timeout="3000"
              color="success"
              multi-line
              style="text-align: center; font-size: 20px; font-weight: bold"
            >
              {{ snackbarMessage }}
              <v-btn text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.booking-bg {
  background-color: #ffd54f;
  min-height: 100vh;
}

.v-card {
  border-radius: 16px;
}

@media (max-width: 600px) {
  .booking-card {
    border-radius: 0;
    margin: -20px;
  }
}
</style>
