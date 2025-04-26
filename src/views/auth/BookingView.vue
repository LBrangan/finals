
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheNavbar from '@/components/layout/TheNavbar.vue'

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

<script>

export default {
  data() {
    return {
      selectedSubjects: [],
      selectedDate: null,
      availableTimeSlots: [],
      selectedTime: null,
      email: '',
      phone: '',
      additionalNotes: '',
      agree: false,
    };
  },
  methods: {
    showTimeSlots() {
      // Example logic to populate available time slots based on selected date
      const timeSlots = {
        '2023-04-29': ['2:00 PM - 4:00 PM'],
        '2023-05-01': ['9:00 AM - 11:00 AM'],
        '2023-05-03': ['1:00 PM - 3:00 PM'],
      };
      this.availableTimeSlots = timeSlots[this.selectedDate] || [];
    },
    bookSession() {
      // Logic to book the session (e.g., API call)
      alert('Session booked!');
    },
  },
};
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2>Book a Session with Maria Sanchez</h2>
        <p>Computer Science - 3rd Year | Online Tutoring</p>
      </v-card-title>

      <v-card-subtitle>
        <h3>1. Select Subject</h3>
      </v-card-subtitle>

      <v-card-text>
        <v-checkbox-group v-model="selectedSubjects">
          <v-checkbox label="Data Structures"></v-checkbox>
          <v-checkbox label="Networking"></v-checkbox>
          <v-checkbox label="Web Development"></v-checkbox>
          <v-checkbox label="Programming 1"></v-checkbox>
        </v-checkbox-group>

        <v-card-subtitle>
          <h3>2. Choose Date & Time</h3>
        </v-card-subtitle>

        <v-date-picker v-model="selectedDate" @input="showTimeSlots" />
        <v-list v-if="availableTimeSlots.length">
          <v-list-item-group v-model="selectedTime">
            <v-list-item v-for="time in availableTimeSlots" :key="time">
              <v-list-item-content>
                <v-list-item-title>{{ time }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-card-subtitle>
          <h3>3. Contact Information</h3>
        </v-card-subtitle>

        <v-text-field v-model="email" label="Email Address" />
        <v-text-field v-model="phone" label="Phone Number" />

        <v-card-subtitle>
          <h3>4. Additional Notes</h3>
        </v-card-subtitle>

        <v-textarea v-model="additionalNotes" label="Any specific topics or questions you'd like to focus on?" />

        <v-checkbox v-model="agree" label="I agree to the session terms and conditions." />
      </v-card-text>

      <v-card-actions>
        <v-btn :disabled="!agree" color="primary" @click="bookSession">Book Session</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<style scoped>
.v-card {
  margin: 20px;

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
      selectedTutor: null,
      selectedSubject: null,
      selectedDate: null,
      selectedTime: null,
      selectedLocation: null,
      agreeTerms: false,
      showCalendar: false,
      tutors: [
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
          name: 'John Davis',
          year: '4th Year',
          field: 'Computer Engineering',
          rating: 4.9,
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
          subjects: ['Computer Architecture', 'Digital Logic', 'Microprocessors'],
        },
        {
          id: 3,
          name: 'Sarah Wilson',
          year: '3rd Year',
          field: 'Software Engineering',
          rating: 4.7,
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
          subjects: ['Web Development', 'Database Systems', 'Software Design'],
        },
      ],
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
  methods: {
    selectTutor(tutor) {
      this.selectedTutor = tutor
    },
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
          tutor: this.selectedTutor.name, // Use selected tutor's name
        }

        // Add to sessions array
        this.sessions.push(newSession)

        // Save to localStorage
        localStorage.setItem('sessions', JSON.stringify(this.sessions))

        toast.success(
          `Session booked on ${this.selectedDate} at ${this.selectedTime}, Location: ${this.selectedLocation}`,
        )


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
    <TheNavbar />
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

.v-btn.v-btn--elevated {
  background-color: #ffa000 !important;
  color: white !important;
}

/* Make time selection buttons more visible */
.v-btn.time-btn {
  border: 2px solid transparent;
  background-color: white !important;
  color: #546e7a !important;
}

.v-btn.time-btn:hover {
  border-color: #ffd54f;
  background-color: #fff8e1 !important;
}

.v-btn.time-btn.selected {
  background-color: #ffa000 !important;
  color: white !important;
  border-color: #ff8f00;
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

.tutor-card {
  transition: all 0.3s ease;
  cursor: pointer;
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

.tutor-card .v-card-title {
  font-size: 1.1rem;
  font-weight: 600;
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
