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
}
</style>
