<template>
  <v-app>
    <v-container fluid class="background">
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              <h2>Book a Session with Maria Sanchez</h2>
            </v-card-title>

            <v-card-subtitle>Subject: Computer Science - 3rd Year | In-Person Tutoring</v-card-subtitle>

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
                      :style="{ backgroundColor: date.isAvailable ? '#FFA500' : '#FFF', cursor: date.isAvailable ? 'pointer' : 'not-allowed' }"
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
            style="text-align: center; font-size: 20px; font-weight: bold;"
          >
            {{ snackbarMessage }}
            <v-btn text @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      selectedSubject: null,
      subjects: [
        'Data Structures',
        'Networking',
        'Web Development',
        'Programming 1',
      ],
      selectedDate: null,
      selectedTime: null,
      availableTimes: ['10:00 AM', '2:00 PM', '4:00 PM'],
      selectedLocation: null,
      locations: ['Room 101', 'Library Study Room', 'Lab 203'],
      agreeTerms: false,
      availableDates: [
        { id: 1, date: 'May 5, 2025', isAvailable: true, location: 'Room 101' },
        { id: 2, date: 'May 7, 2025', isAvailable: true, location: 'CL 5' },
        { id: 3, date: 'May 9, 2025', isAvailable: true, location: 'Library Study Room' },
        { id: 4, date: 'May 13, 2025', isAvailable: true, location: 'Room 101' },
        { id: 5, date: 'May 15, 2025', isAvailable: true, location: 'Library Study Room' },
      ],
      snackbar: false,
      snackbarMessage: '',
    };
  },
  methods: {
    selectDate(date) {
      if (date.isAvailable) {
        this.selectedDate = date.date;
        this.selectedLocation = date.location; // Automatically select location based on available date
      }
    },
    bookSession() {
      const selectedAvailableDate = this.availableDates.find(
        (date) => date.date === this.selectedDate && date.isAvailable
      );

      if (selectedAvailableDate) {
        this.snackbarMessage = `Session booked on ${this.selectedDate} at ${this.selectedTime}, Location: ${this.selectedLocation}`;
        this.snackbar = true;
        // Implement further booking logic here
      } else {
        this.snackbarMessage = 'Please select an available date.';
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
.background {
  background-color: #f5c042; /* Yellow background */
  height: 100vh; /* Full height */
}
</style>
