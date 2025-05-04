<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'

// Props
const props = defineProps({
  selectedSubject: String,
})

// Emits
const emit = defineEmits(['update-subject'])

// Local list of subjects
const subjects = ref(['Data Structures', 'Networking', 'Web Development', 'Programming 1'])

// Computed proxy for two-way binding
const selectedSubjectProxy = computed({
  get: () => props.selectedSubject,
  set: (value) => emit('update-subject', value),
})
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
    ></v-select>
  </v-form>
</template>
