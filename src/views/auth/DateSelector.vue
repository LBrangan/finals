<script>
export default {
  props: {
    selectedDate: String,
  },
  data() {
    return {
      availableDates: [
        { id: 1, date: 'May 5, 2025', isAvailable: true, location: 'Room 101' },
        { id: 2, date: 'May 7, 2025', isAvailable: true, location: 'CL 5' },
        { id: 3, date: 'May 9, 2025', isAvailable: true, location: 'Library Study Room' },
        { id: 4, date: 'May 13, 2025', isAvailable: true, location: 'Room 101' },
        { id: 5, date: 'May 15, 2025', isAvailable: true, location: 'Library Study Room' },
      ],
    }
  },
  methods: {
    selectDate(date) {
      if (date.isAvailable) {
        this.$emit('update-date', date)
      }
    },
    nextStep() {
      this.$emit('next-step')
    },
  },
}
</script>

<template>
  <h3>Select an Available Date</h3>
  <v-row>
    <v-col v-for="date in availableDates" :key="date.id" cols="12" md="6" lg="4">
      <v-card
        :elevation="date.isAvailable ? 4 : 1"
        :style="{
          background: date.isAvailable ? 'linear-gradient(135deg, #81C784, #66BB6A)' : '#ECEFF1',
          color: date.isAvailable ? '#FFFFFF' : '#9E9E9E',
          cursor: date.isAvailable ? 'pointer' : 'not-allowed',
          borderRadius: '12px',
          padding: '16px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }"
        @click="selectDate(date)"
      >
        <v-card-title>
          <v-icon :color="date.isAvailable ? 'white' : 'grey'" class="mr-2"> mdi-calendar </v-icon>
          {{ date.date }}
        </v-card-title>
        <v-card-subtitle>
          <v-icon :color="date.isAvailable ? 'white' : 'grey'" class="mr-2">
            mdi-map-marker
          </v-icon>
          Location: {{ date.location }}
        </v-card-subtitle>
        <v-card-text>
          Status:
          <strong>{{ date.isAvailable ? 'Available' : 'Not Available' }}</strong>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-btn color="primary" @click="nextStep" :disabled="!selectedDate">Next</v-btn>
</template>
