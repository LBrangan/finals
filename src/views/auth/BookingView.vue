<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedSubject = ref(null)
const selectedDate = ref(null)
const selectedTime = ref(null)
const selectedLocation = ref(null)
const agreeTerms = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')

const subjects = ['Data Structures', 'Networking', 'Web Development', 'Programming 1']
const availableTimes = ['10:00 AM', '2:00 PM', '4:00 PM']
const locations = ['Room 101', 'Library Study Room', 'Lab 203']

const availableDates = [
  { id: 1, date: 'May 5, 2025', isAvailable: true, location: 'Room 101' },
  { id: 2, date: 'May 7, 2025', isAvailable: true, location: 'CL 5' },
  { id: 3, date: 'May 9, 2025', isAvailable: true, location: 'Library Study Room' },
  { id: 4, date: 'May 13, 2025', isAvailable: true, location: 'Room 101' },
  { id: 5, date: 'May 15, 2025', isAvailable: true, location: 'Library Study Room' },
]

function selectDate(date) {
  if (date.isAvailable) {
    selectedDate.value = date.date
    selectedLocation.value = date.location
  }
}

function bookSession() {
  if (selectedDate.value && selectedTime.value && selectedLocation.value) {
    snackbarMessage.value = `Session booked successfully for ${selectedDate.value} at ${selectedTime.value}`
    snackbar.value = true
    setTimeout(() => router.push('/dashboard'), 2000)
  }
}
</script>

<template>
  <v-app>
    <v-main class="booking-bg">
      <v-container fluid>
        <v-row class="justify-center">
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title>
                <h2>Book a Session with Maria Sanchez</h2>
              </v-card-title>

              <v-card-subtitle
                >Subject: Computer Science - 3rd Year | In-Person Tutoring</v-card-subtitle
              >

              <v-card-text>
                <v-form>
                  <v-select
                    v-model="selectedSubject"
                    :items="subjects"
                    label="Select Subject"
                  ></v-select>

                  <v-date-picker
                    v-model="selectedDate"
                    label="Choose Date"
                    :disabled="false"
                  ></v-date-picker>

                  <v-select
                    v-model="selectedTime"
                    :items="availableTimes"
                    label="Choose Time"
                  ></v-select>

                  <v-select
                    v-model="selectedLocation"
                    :items="locations"
                    label="Select Location"
                  ></v-select>

                  <v-checkbox
                    v-model="agreeTerms"
                    label="I agree to the session terms and conditions"
                    required
                  ></v-checkbox>

                  <v-btn
                    color="primary"
                    @click="bookSession"
                    :disabled="!agreeTerms || !selectedDate || !selectedTime || !selectedLocation"
                  >
                    Book Session
                  </v-btn>
                </v-form>

                <v-divider></v-divider>

                <v-card-subtitle>
                  <h1 class="pt-5">Available Dates</h1>
                  <h3>Select here:</h3>
                </v-card-subtitle>
                <v-card-text>
                  <v-list>
                    <v-list-item-group>
                      <v-list-item
                        v-for="date in availableDates"
                        :key="date.id"
                        :style="{
                          backgroundColor: date.isAvailable ? '#FFA500' : '#FFF',
                          cursor: date.isAvailable ? 'pointer' : 'not-allowed',
                        }"
                        @click="date.isAvailable ? selectDate(date) : null"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ date.date }} - Location: {{ date.location }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Status: {{ date.isAvailable ? 'Available' : 'Not Available' }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>
              </v-card-text>
            </v-card>

            <!-- Snackbar for messages -->
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

.session-card {
  transition: transform 0.2s;
}

.session-card:hover {
  transform: translateY(-2px);
}
</style>
