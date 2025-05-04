<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

defineProps({
  selectedSubject: String,
})

const emit = defineEmits(['update-subject'])
const subjects = ref([])
const loading = ref(false)

const fetchSubjects = async () => {
  loading.value = true
  try {
    // Fetch subjects from Supabase
    const { data, error } = await supabase.from('subjects').select('*')

    if (error) throw error

    // Add custom subjects manually
    const customSubjects = [
      { id: '1', subject_name: 'Programming' },
      { id: '2', subject_name: 'Data Structures' },
      { id: '3', subject_name: 'Algorithms' },
      { id: '4', subject_name: 'Software Design' },
      { id: '5', subject_name: 'Operating Systems' },
      { id: '6', subject_name: 'Computer Architecture' },
    ]

    // Combine fetched subjects with custom subjects
    const combinedSubjects = [...data, ...customSubjects]

    // Map subjects to the format required by v-select
    subjects.value = combinedSubjects.map((subject) => ({
      value: subject.id,
      title: subject.subject_name,
    }))
  } catch (error) {
    console.error('Error fetching subjects:', error)
  } finally {
    loading.value = false
  }
}

const updateSubject = (subject) => {
  emit('update-subject', subject) // Emit the selected subject to the parent
}

onMounted(() => {
  fetchSubjects()
})
</script>

<template>
  <v-form>
    <v-select
      :model-value="selectedSubject"
      :items="subjects"
      label="Select Subject"
      outlined
      dense
      clearable
      prepend-icon="mdi-book"
      @update:model-value="updateSubject"
    ></v-select>
  </v-form>
</template>

