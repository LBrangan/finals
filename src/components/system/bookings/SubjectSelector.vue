<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const props = defineProps({
  selectedSubject: String,
})

const emit = defineEmits(['update-subject'])
const subjects = ref([])
const loading = ref(false)

const fetchSubjects = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase.from('subjects').select('*')

    if (error) throw error
    subjects.value = data.map((subject) => ({
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
  emit('update-subject', subject)
}

onMounted(() => {
  fetchSubjects()
})
</script>

<template>
  <v-form>
    <v-select
      :v-model="props.selectedSubject"
      :items="subjects"
      label="Select Subject"
      outlined
      dense
      clearable
      prepend-icon="mdi-book"
      @change="updateSubject"
    ></v-select>
  </v-form>
</template>
