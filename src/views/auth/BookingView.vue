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
      selectedSubject: null,
      selectedDate: null,
      selectedTime: null,
      selectedLocation: null,
      agreeTerms: false,
      showCalendar: false,
    }
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
        toast.success(
          `Session booked on ${this.selectedDate} at ${this.selectedTime}, Location: ${this.selectedLocation}`,
        )
        // Optionally reset other fields, but NOT location
        this.selectedSubject = null
        this.selectedDate = null
        this.selectedTime = null
        this.agreeTerms = false
      } else {
        toast.error('Please complete all fields.')
      }
    },
  },
}
</script>

<template>
  <v-app>
    <v-container fluid class="background">
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="10" lg="8">
          <v-card class="pa-5 elevation-3">
            <v-card-title class="text-h4 text-center" tabindex="0">
              Book a Session with Maria Sanchez
            </v-card-title>
            <v-card-subtitle class="text-center mb-4" tabindex="0">
              Subject: Computer Science - 3rd Year | In-Person Tutoring
            </v-card-subtitle>

            <!-- Subject Selection -->
            <v-card class="pa-4 mb-4">
              <v-card-title class="text-h6">Step 1: Select a Subject</v-card-title>
              <SubjectSelector
                :selectedSubject="selectedSubject"
                @update-subject="updateSubject"
                aria-label="Subject Selector"
              />
            </v-card>

            <!-- Date Selection with Calendar -->
            <v-card class="pa-4 mb-4">
              <v-card-title class="text-h6">Step 2: Choose a Date</v-card-title>
              <DateSelector
                :selectedDate="selectedDate"
                @update-date="updateDate"
                aria-label="Date Selector"
              />
              <!-- Optional: Add a calendar button for accessibility -->
              <v-btn
                color="primary"
                class="mt-3"
                @click="showCalendar = !showCalendar"
                aria-label="Open calendar"
              >
                <v-icon left>mdi-calendar</v-icon>
                {{ selectedDate ? selectedDate : 'Select Date' }}
              </v-btn>
              <v-menu
                v-model="showCalendar"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator>
                  <!-- Hidden activator, handled by button above -->
                </template>
                <v-date-picker
                  v-model="selectedDate"
                  @input="(d) => updateDate({ date: d, location: selectedLocation })"
                  :min="new Date().toISOString().slice(0, 10)"
                  color="primary"
                  no-title
                  aria-label="Calendar Date Picker"
                ></v-date-picker>
              </v-menu>
            </v-card>

            <!-- Booking Confirmation -->
            <v-card class="pa-4 mb-4">
              <v-card-title class="text-h6">Step 3: Confirm Your Booking</v-card-title>
              <BookingConfirmation
                :selectedSubject="selectedSubject"
                :selectedDate="selectedDate"
                :selectedTime="selectedTime"
                :selectedLocation="selectedLocation"
                :agreeTerms="agreeTerms"
                @update-terms="agreeTerms = $event"
                @confirm-booking="bookSession"
              />
              <v-row class="mt-4" justify="end">
                <v-btn
                  color="success"
                  :disabled="
                    !selectedSubject ||
                    !selectedDate ||
                    !selectedTime ||
                    !selectedLocation ||
                    !agreeTerms
                  "
                  @click="bookSession"
                  aria-label="Confirm Booking"
                >
                  <v-icon left>mdi-check</v-icon>
                  Confirm Booking
                </v-btn>
                <v-btn
                  color="secondary"
                  class="ml-2"
                  @click="
                    ;(selectedSubject = null), (selectedDate = null)
                    selectedTime = null
                    agreeTerms = false
                  "
                  aria-label="Reset Form"
                >
                  <v-icon left>mdi-refresh</v-icon>
                  Reset
                </v-btn>
              </v-row>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.background {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}
.v-btn:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
</style>
