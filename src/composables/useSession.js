import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'

export function useSession() {
  const sessions = ref([])
  const loading = ref(false)
  const error = ref(null)
  const authStore = useAuthUserStore()

  const fetchSessions = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('schedules')
        .select(
          `
          *,
          profiles (*),
          subjects (*)
        `,
        )
        .eq('profiles_id', authStore.userData.id)

      if (supabaseError) throw supabaseError
      sessions.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const createSession = async (sessionData) => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('schedules')
        .insert([
          {
            profiles_id: sessionData.tutorId,
            subjects_id: sessionData.subjectId,
            available_date: sessionData.date,
            available_time: sessionData.time,
            status: 'upcoming',
          },
        ])
        .select()

      if (supabaseError) throw supabaseError
      return data[0]
    } catch (e) {
      error.value = e.message
      throw e
    }
  }

  return {
    sessions,
    loading,
    error,
    fetchSessions,
    createSession,
  }
}
