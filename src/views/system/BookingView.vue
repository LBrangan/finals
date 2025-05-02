<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import SubjectSelector from '@/components/system/bookings/SubjectSelector.vue'
import DateSelector from '@/components/system/bookings/DateSelector.vue'
import BookingConfirmation from '@/components/system/bookings/BookingConfirmation.vue'

const router = useRouter()
const form = ref(null)
const selectedSubject = ref(null)
const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedLocation = ref(null)
const agreeTerms = ref(false)
const email = ref('')
const phone = ref('')
const additionalNotes = ref('')

const tutors = ref([
  {
    id: 1,
    name: 'Maria Sanchez',
    year: '3rd Year',
    field: 'Computer Science',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    subjects: ['Programming', 'Data Structures', 'Algorithms'],
  },
  {
    id: 2,
    name: 'John Doe',
    year: '2nd Year',
    field: 'Information Technology',
    rating: 4.5,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    subjects: ['Networking', 'Database Systems', 'Web Development'],
  },
  {
    id: 3,
    name: 'Jane Smith',
    year: '4th Year',
    field: 'Software Engineering',
    rating: 4.9,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    subjects: ['Software Design', 'Operating Systems', 'Computer Architecture'],
  },
])

const selectedTutor = ref(null)
const currentStep = ref(1)

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000,
})

function showSnackbar(message, color = 'success', timeout = 3000) {
  snackbar.value = {
    show: true,
    message,
    color,
    timeout,
  }
}

const availableTimes = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
]

// Validation rules
const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const phoneRules = [
  (v) => !!v || 'Phone number is required',
  (v) => /^\d{10}$/.test(v) || 'Phone must be 10 digits',
]

function selectTutor(tutor) {
  selectedTutor.value = tutor
}

async function nextStep() {
  if (currentStep.value === 1 && !selectedTutor.value) {
    showSnackbar('Please select a tutor', 'error')
    return
  }
  if (currentStep.value === 2 && (!selectedDate.value || !selectedTime.value)) {
    showSnackbar('Please select date and time', 'error')
    return
  }
  if (currentStep.value === 3) {
    const isValid = await form.value?.validate()
    if (!isValid) return
  }
  if (currentStep.value < 4) currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

function resetForm() {
  selectedTutor.value = null
  selectedSubject.value = null
  selectedDate.value = null
  selectedTime.value = null
  selectedLocation.value = null
  agreeTerms.value = false
  currentStep.value = 1
  email.value = ''
  phone.value = ''
  additionalNotes.value = ''
  if (form.value) {
    form.value.reset()
  }
}

async function bookSession() {
  if (!selectedSubject.value || !email.value || !phone.value || !selectedTutor.value) {
    showSnackbar('Please fill in all required fields', 'error')
    return
  }

  try {
    const newSession = {
      id: Date.now(),
      tutor: selectedTutor.value.name,
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

    showSnackbar('Booking successful! Redirecting to dashboard...')
    resetForm()
    setTimeout(() => router.push('/dashboard'), 2000)
  } catch {
    showSnackbar('Failed to book session. Please try again.', 'error')
  }
}
</script>

<template>
  <v-app>
    <TheNavbar />
    <v-main class="booking-background">
      <v-container fluid>
        <v-row justify="center" class="mt-5">
          <v-col cols="12" md="10" lg="8">
            <v-card class="booking-card">
              <v-card-title class="text-h4 text-center font-weight-bold mb-6">
                Book a Tutoring Session
                <div class="text-subtitle-1 mt-2 text-grey">
                  Choose your preferred tutor to get started
                </div>
              </v-card-title>

              <v-window v-model="currentStep" class="mb-6">
                <!-- Step 1: Tutor Selection -->
                <v-window-item :value="1">
                  <v-card flat>
                    <v-card-title class="text-h6 d-flex align-center">
                      <v-icon color="amber" class="mr-2">mdi-account-group</v-icon>
                      Step 1: Select a Tutor
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col v-for="tutor in tutors" :key="tutor.id" cols="12" md="4">
                          <v-card
                            :class="{ 'selected-tutor': selectedTutor?.id === tutor.id }"
                            @click="selectTutor(tutor)"
                            elevation="2"
                            class="tutor-card"
                          >
                            <v-img :src="tutor.image" height="200" cover></v-img>
                            <v-card-title>{{ tutor.name }}</v-card-title>
                            <v-card-subtitle>{{ tutor.field }} - {{ tutor.year }}</v-card-subtitle>
                            <v-card-text>
                              <div class="d-flex align-center">
                                <v-rating
                                  :model-value="tutor.rating"
                                  color="amber"
                                  density="compact"
                                  half-increments
                                  readonly
                                  size="small"
                                ></v-rating>
                                <span class="ml-2">{{ tutor.rating }}/5</span>
                              </div>
                              <div class="mt-2">
                                <v-chip
                                  v-for="subject in tutor.subjects"
                                  :key="subject"
                                  class="mr-1 mb-1"
                                  size="small"
                                  color="amber-lighten-4"
                                >
                                  {{ subject }}
                                </v-chip>
                              </div>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-window-item>

                <!-- Step 2: Subject and Date Selection -->
                <v-window-item :value="2">
                  <v-card flat>
                    <v-card-title class="text-h6 d-flex align-center">
                      <v-icon color="amber" class="mr-2">mdi-calendar-clock</v-icon>
                      Step 2: Schedule
                    </v-card-title>
                    <v-card-text>
                      <SubjectSelector
                        :selected-subject="selectedSubject"
                        :tutor-subjects="selectedTutor?.subjects || []"
                        class="mb-4"
                        @update-subject="(subject) => (selectedSubject = subject)"
                      />
                      <DateSelector
                        :selected-subject="selectedSubject"
                        :selected-date="selectedDate"
                        :selected-time="selectedTime"
                        :selected-location="selectedLocation"
                      />
                      <v-select
                        v-model="selectedTime"
                        :items="availableTimes"
                        label="Choose Time"
                        class="mt-4"
                        color="amber-darken-2"
                      />
                    </v-card-text>
                  </v-card>
                </v-window-item>

                <!-- Step 3: Contact Details -->
                <v-window-item :value="3">
                  <v-card flat>
                    <v-card-title class="text-h6 d-flex align-center">
                      <v-icon color="amber" class="mr-2">mdi-account-circle</v-icon>
                      Step 3: Your Information
                    </v-card-title>
                    <v-card-text>
                      <v-form ref="form">
                        <v-text-field v-model="email" label="Email*" :rules="emailRules" required />
                        <v-text-field
                          v-model="phone"
                          label="Phone Number*"
                          :rules="phoneRules"
                          required
                        />
                        <v-textarea v-model="additionalNotes" label="Additional Notes" rows="3" />
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-window-item>

                <!-- Step 4: Confirmation -->
                <v-window-item :value="4">
                  <v-card flat>
                    <v-card-title class="text-h6 d-flex align-center">
                      <v-icon color="amber" class="mr-2">mdi-check-circle</v-icon>
                      Step 4: Confirmation
                    </v-card-title>
                    <v-card-text>
                      <BookingConfirmation
                        :selected-subject="selectedSubject"
                        :selected-date="selectedDate"
                        :selected-time="selectedTime"
                        :selected-location="selectedLocation"
                        :agree-terms="agreeTerms"
                        @update-terms="updateTerms"
                        @confirm-booking="bookSession"
                      />
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>

              <v-divider class="mb-4"></v-divider>

              <v-card-actions class="px-4 pb-4">
                <v-btn v-if="currentStep > 1" variant="outlined" @click="prevStep"> Back </v-btn>
                <v-spacer />
                <v-btn v-if="currentStep < 4" color="primary" @click="nextStep"> Continue </v-btn>
                <v-btn v-else color="success" :disabled="!agreeTerms" @click="bookSession">
                  Confirm Booking
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top"
      rounded="pill"
      elevation="4"
    >
      <div class="d-flex align-center">
        <v-icon
          :icon="snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'"
          class="mr-2"
        />
        {{ snackbar.message }}
      </div>

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style scoped>
.booking-background {
  background: linear-gradient(135deg, #ffd54f 0%, #ffecb3 100%);
  min-height: 100vh;
  padding: 20px;
}

.booking-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-window {
  box-shadow: none;
}

.v-window-item {
  padding: 20px;
}

.text-h4 {
  color: #2c3e50;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.text-h6 {
  color: #34495e;
  font-weight: 600;
}

.text-subtitle-1 {
  color: #546e7a;
}

.v-card-text {
  color: #37474f !important;
}

.v-card-subtitle {
  color: #455a64 !important;
  opacity: 1;
}

.tutor-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.95);
}

.tutor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.selected-tutor {
  border: 2px solid #ffd54f;
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.v-snackbar {
  font-weight: 500;
}

.v-snackbar__content {
  padding: 12px;
}

.v-snackbar__actions {
  margin-inline-start: 12px;
}

.v-text-field,
.v-textarea {
  color: #2c3e50 !important;
}

.v-text-field :deep(input),
.v-textarea :deep(textarea) {
  color: #2c3e50 !important;
}

.v-text-field :deep(label),
.v-textarea :deep(label) {
  color: #546e7a !important;
}

.v-select :deep(.v-select__selection) {
  color: #2c3e50 !important;
}
</style>
