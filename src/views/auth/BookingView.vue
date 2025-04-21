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
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="10" lg="8">
          <v-card class="pa-5 elevation-3">
            <v-card-title class="text-h4 text-center">
              Book a Session with Maria Sanchez
            </v-card-title>
            <v-card-subtitle class="text-center mb-4">
              Subject: Computer Science - 3rd Year | In-Person Tutoring
            </v-card-subtitle>

            <v-stepper v-model="step" class="elevation-1">
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="pa-4 mb-4">
                    <SubjectSelector
                      :selectedSubject="selectedSubject"
                      @update-subject="updateSubject"
                    />
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="pa-4 mb-4">
                    <DateSelector :selectedDate="selectedDate" @update-date="updateDate" />
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card class="pa-4 mb-4">
                    <BookingConfirmation
                      :selectedSubject="selectedSubject"
                      :selectedDate="selectedDate"
                      :selectedTime="selectedTime"
                      :selectedLocation="selectedLocation"
                      :agreeTerms="agreeTerms"
                      @update-terms="agreeTerms = $event"
                      @confirm-booking="bookSession"
                    />
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

            <v-snackbar
              v-model="snackbar"
              :timeout="3000"
              color="success"
              multi-line
              class="text-center"
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
  min-height: 100vh;
  padding: 20px;
}
</style>
