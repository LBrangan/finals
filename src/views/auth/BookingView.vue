<script>
import { useToast } from 'vue-toastification'
import SubjectSelector from '@/components/SubjectSelector.vue'
import DateSelector from '@/components/DateSelector.vue'
import BookingConfirmation from '@/components/BookingConfirmation.vue'

export default {
  components: {
    SubjectSelector,
    DateSelector,
    BookingConfirmation,
  },
  data() {
    return {
      currentStep: 1,
      selectedSubject: null,
      selectedDate: null,
      selectedTime: null,
      selectedLocation: null,
      agreeTerms: false,
      showCalendar: false,
      availableTimes: [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
      ],
      sessions: JSON.parse(localStorage.getItem('sessions') || '[]'),
    }
  },
  computed: {
    progress() {
      if (this.selectedSubject) return this.currentStep >= 1 ? 33 : 0
      if (this.selectedDate && this.selectedLocation) return this.currentStep >= 2 ? 66 : 33
      if (this.selectedTime && this.agreeTerms) return 100
      return this.currentStep * 33
    },
  },
  methods: {
    updateSubject(subject) {
      this.selectedSubject = subject
    },
    updateDate(date) {
      this.selectedDate = date.date
      this.selectedLocation = date.location
    },
    updateTime(time) {
      this.selectedTime = time
    },
    bookSession() {
      const toast = useToast()
      if (!this.agreeTerms) {
        toast.error('You must agree to the terms and conditions before booking.')
        return
      }
      if (this.selectedDate && this.selectedTime && this.selectedLocation) {
        // Create new session object
        const newSession = {
          id: Date.now(), // Simple way to generate unique ID
          subject: this.selectedSubject,
          date: this.selectedDate,
          time: this.selectedTime,
          location: this.selectedLocation,
          tutor: 'Maria Sanchez', // Hardcoded for this example
        }

        // Add to sessions array
        this.sessions.push(newSession)

        // Save to localStorage
        localStorage.setItem('sessions', JSON.stringify(this.sessions))

        toast.success(
          `Session booked on ${this.selectedDate} at ${this.selectedTime}, Location: ${this.selectedLocation}`,
        )

        // Reset form
        this.selectedSubject = null
        this.selectedDate = null
        this.selectedTime = null
        this.agreeTerms = false
      } else {
        toast.error('Please complete all fields.')
      }
    },
    nextStep() {
      if (
        (this.currentStep === 1 && this.selectedSubject) ||
        (this.currentStep === 2 && this.selectedDate && this.selectedTime) ||
        this.currentStep === 3
      ) {
        if (this.currentStep < 3) {
          this.currentStep++
        }
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    resetForm() {
      this.selectedSubject = null
      this.selectedDate = null
      this.selectedTime = null
      this.selectedLocation = null
      this.agreeTerms = false
      this.currentStep = 1
    },
  },
}
</script>

<template>
  <v-app>
    <v-container fluid class="booking-background">
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="10" lg="8">
          <v-card class="booking-card">
            <v-progress-linear
              :model-value="progress"
              color="amber-darken-2"
              height="8"
              rounded
              class="mb-4"
            ></v-progress-linear>

            <v-card-title class="text-h4 text-center font-weight-bold mb-6">
              Book a Session with Maria Sanchez
              <div class="text-subtitle-1 mt-2 text-grey">
                Computer Science - 3rd Year | In-Person Tutoring
              </div>
            </v-card-title>

            <v-window v-model="currentStep" class="mb-6">
              <v-window-item :value="1">
                <v-card flat>
                  <v-card-title class="text-h6 d-flex align-center">
                    <v-icon color="amber" class="mr-2">mdi-book-open-variant</v-icon>
                    Step 1: Select a Subject
                  </v-card-title>
                  <v-card-text>
                    <SubjectSelector
                      :selectedSubject="selectedSubject"
                      @update-subject="updateSubject"
                    />
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item :value="2">
                <v-card flat>
                  <v-card-title class="text-h6 d-flex align-center">
                    <v-icon color="amber" class="mr-2">mdi-calendar</v-icon>
                    Step 2: Choose a Date & Time
                  </v-card-title>
                  <v-card-text>
                    <DateSelector :selectedDate="selectedDate" @update-date="updateDate" />
                    <v-divider class="my-4"></v-divider>
                    <v-card-subtitle class="pb-0 text-h6">Available Times</v-card-subtitle>
                    <v-row class="mt-2">
                      <v-col v-for="time in availableTimes" :key="time" cols="12" sm="4" md="3">
                        <v-btn
                          block
                          :color="selectedTime === time ? 'amber-darken-2' : 'grey-lighten-3'"
                          :variant="selectedTime === time ? 'elevated' : 'outlined'"
                          @click="updateTime(time)"
                          class="mb-2"
                        >
                          {{ time }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item :value="3">
                <v-card flat>
                  <v-card-title class="text-h6 d-flex align-center">
                    <v-icon color="amber" class="mr-2">mdi-check-circle</v-icon>
                    Step 3: Confirm Your Booking
                  </v-card-title>
                  <v-card-text>
                    <BookingConfirmation
                      :selectedSubject="selectedSubject"
                      :selectedDate="selectedDate"
                      :selectedTime="selectedTime"
                      :selectedLocation="selectedLocation"
                      :agreeTerms="agreeTerms"
                      @update-terms="agreeTerms = $event"
                      @confirm-booking="bookSession"
                    />
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>

            <v-divider class="mb-4"></v-divider>

            <v-card-actions class="px-4 pb-4">
              <v-btn color="grey" variant="text" @click="prevStep" :disabled="currentStep === 1">
                <v-icon left>mdi-arrow-left</v-icon>
                Back
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" variant="text" @click="resetForm">
                <v-icon left>mdi-refresh</v-icon>
                Reset
              </v-btn>
              <v-btn
                color="amber-darken-2"
                @click="currentStep === 3 ? bookSession() : nextStep()"
                :disabled="
                  (currentStep === 1 && !selectedSubject) ||
                  (currentStep === 2 && !selectedDate) ||
                  (currentStep === 3 && (!agreeTerms || !selectedTime))
                "
              >
                {{ currentStep === 3 ? 'Confirm Booking' : 'Continue' }}
                <v-icon right>{{ currentStep === 3 ? 'mdi-check' : 'mdi-arrow-right' }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 24px;
}

.v-window {
  min-height: 400px;
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.02);
}

.v-btn:focus {
  outline: 2px solid #ffd54f;
  outline-offset: 2px;
}

/* Animations */
.v-window-item {
  transition: all 0.3s ease-out;
}

.v-window-item:not(.v-window-item--active) {
  opacity: 0;
  transform: translateX(100px);
}

.v-window-item--active {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 600px) {
  .booking-card {
    border-radius: 0;
    margin: -20px;
  }

  .v-window {
    min-height: 500px;
  }
}
</style>
