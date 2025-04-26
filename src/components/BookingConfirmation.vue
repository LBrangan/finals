<script>
export default {
  props: {
    selectedSubject: String,
    selectedDate: String,
    selectedTime: String,
    selectedLocation: String,
    agreeTerms: Boolean,
  },
  data() {
    return {
      localAgreeTerms: this.agreeTerms,
    }
  },
  watch: {
    localAgreeTerms(newValue) {
      this.updateTerms(newValue)
    },
  },
  methods: {
    confirmBooking() {
      this.$emit('confirm-booking')
    },
    updateTerms(value) {
      this.$emit('update-terms', value)
    },
  },
}
</script>

<template>
  <h3>Confirm Your Booking</h3>
  <p>
    <strong>Subject:</strong> {{ selectedSubject }} <br />
    <strong>Date:</strong> {{ selectedDate }} <br />
    <strong>Time:</strong> {{ selectedTime }} <br />
    <strong>Location:</strong> {{ selectedLocation }}
  </p>
  <v-checkbox
    v-model="localAgreeTerms"
    label="I agree to the session terms and conditions"
    @change="updateTerms"
  ></v-checkbox>
  <v-btn color="success" @click="confirmBooking" :disabled="!agreeTerms"> Confirm Booking </v-btn>
</template>
