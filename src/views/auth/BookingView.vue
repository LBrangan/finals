<script>
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
      step: 1,
      selectedSubject: null,
      selectedDate: null,
      selectedTime: null,
      selectedLocation: null,
      agreeTerms: false,
      snackbar: false,
      snackbarMessage: '',
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
    bookSession() {
      if (this.selectedDate && this.selectedTime && this.selectedLocation) {
        this.snackbarMessage = `Session booked on ${this.selectedDate} at ${this.selectedTime}, Location: ${this.selectedLocation}`
        this.snackbar = true
      } else {
        this.snackbarMessage = 'Please complete all fields.'
        this.snackbar = true
      }
    },
  },
}
</script>

<template>
  <v-app>
    <v-container fluid class="background">
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              <h2>Book a Session with Maria Sanchez</h2>
            </v-card-title>
            <v-card-subtitle>
              Subject: Computer Science - 3rd Year | In-Person Tutoring
            </v-card-subtitle>

            <v-stepper v-model="step">
              <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Select Subject</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">Choose Date</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 3" step="3">Confirm Details</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <SubjectSelector
                    :selectedSubject="selectedSubject"
                    @update-subject="updateSubject"
                    @next-step="step = 2"
                  />
                </v-stepper-content>

                <v-stepper-content step="2">
                  <DateSelector
                    :selectedDate="selectedDate"
                    @update-date="updateDate"
                    @next-step="step = 3"
                  />
                </v-stepper-content>

                <v-stepper-content step="3">
                  <BookingConfirmation
                    :selectedSubject="selectedSubject"
                    :selectedDate="selectedDate"
                    :selectedTime="selectedTime"
                    :selectedLocation="selectedLocation"
                    :agreeTerms="agreeTerms"
                    @update-terms="agreeTerms = $event"
                    @confirm-booking="bookSession"
                  />
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.background {
  background-color: #f5f5f5;
  height: max-content;
}
</style>
