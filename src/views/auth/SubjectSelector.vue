<script>
export default {
  props: {
    selectedSubject: String,
  },
  computed: {
    selectedSubjectProxy: {
      get() {
        return this.selectedSubject
      },
      set(value) {
        this.updateSubject(value)
      },
    },
  },
  data() {
    return {
      subjects: ['Data Structures', 'Networking', 'Web Development', 'Programming 1'],
    }
  },
  methods: {
    nextStep() {
      this.$emit('next-step')
    },
    updateSubject(subject) {
      this.$emit('update-subject', subject)
    },
  },
}
</script>

<template>
  <v-form>
    <v-select
      v-model="selectedSubjectProxy"
      :items="subjects"
      label="Select Subject"
      outlined
      dense
      clearable
      prepend-icon="mdi-book"
      @change="updateSubject"
    ></v-select>
    <v-btn color="primary" @click="nextStep" :disabled="!selectedSubject"> Next </v-btn>
  </v-form>
</template>
