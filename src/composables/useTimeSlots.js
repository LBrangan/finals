import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export function useTimeSlots() {
  const availableSlots = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAvailableSlots = async (tutorId, date) => {
    loading.value = true
    try {
      const { data, error: supabaseError } = await supabase
        .from('schedules')
        .select('available_time')
        .eq('profiles_id', tutorId)
        .eq('available_date', date)
        .eq('status', 'available')

      if (supabaseError) throw supabaseError
      availableSlots.value = data.map((slot) => slot.available_time)
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    availableSlots,
    loading,
    error,
    fetchAvailableSlots,
  }
}
