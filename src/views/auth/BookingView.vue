<script>
<<<<<<< HEAD
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
=======
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

        // Reset form
        this.selectedTutor = null
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
        (this.currentStep === 1 && this.selectedTutor) ||
        (this.currentStep === 2 && this.selectedSubject) ||
        (this.currentStep === 3 && this.selectedDate && this.selectedTime) ||
        this.currentStep === 4
      ) {
        if (this.currentStep < 4) {
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
      this.selectedTutor = null
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
            <v-card-title class="text-h4 text-center font-weight-bold mb-6">
              Book a Tutoring Session
              <div class="text-subtitle-1 mt-2 text-grey">
                Choose your preferred tutor to get started
              </div>
            </v-card-title>

            <v-window v-model="currentStep" class="mb-6">
              <!-- Tutor Selection Step -->
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
                          <v-card-subtitle> {{ tutor.field }} - {{ tutor.year }} </v-card-subtitle>
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

              <!-- Existing Steps (adjust value to 2, 3, 4) -->
              <v-window-item :value="2">
                <v-card flat>
                  <v-card-title class="text-h6 d-flex align-center">
                    <v-icon color="amber" class="mr-2">mdi-book-open-variant</v-icon>
                    Step 2: Select a Subject
                  </v-card-title>
                  <v-card-text>
                    <SubjectSelector
                      :selectedSubject="selectedSubject"
                      @update-subject="updateSubject"
                    />
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item :value="3">
                <v-card flat>
                  <v-card-title class="text-h6 d-flex align-center">
                    <v-icon color="amber" class="mr-2">mdi-calendar</v-icon>
                    Step 3: Choose a Date & Time
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
                          class="mb-2 time-btn"
                          :class="{ selected: selectedTime === time }"
                        >
                          {{ time }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item :value="4">
                <v-card flat>
                  <v-card-title class="text-h6 d-flex align-center">
                    <v-icon color="amber" class="mr-2">mdi-check-circle</v-icon>
                    Step 4: Confirm Your Booking
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
                @click="currentStep === 4 ? bookSession() : nextStep()"
                :disabled="
                  (currentStep === 1 && !selectedTutor) ||
                  (currentStep === 2 && !selectedSubject) ||
                  (currentStep === 3 && !selectedDate) ||
                  (currentStep === 4 && (!agreeTerms || !selectedTime))
                "
              >
                {{ currentStep === 4 ? 'Confirm Booking' : 'Continue' }}
                <v-icon right>{{ currentStep === 4 ? 'mdi-check' : 'mdi-arrow-right' }}</v-icon>
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
  min-height: 450px; /* Increased height */
}

/* Improved text readability */
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
  font-size: 1.1rem;
}

/* Enhanced button styles */
.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 1rem;
  height: 48px;
}

.v-btn:hover {
  transform: scale(1.02);
}

.v-btn:focus {
  outline: 2px solid #ffd54f;
  outline-offset: 2px;
}

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
>>>>>>> f0ffe068f35d31afa3253e34824084398dbac361
}
</style>
