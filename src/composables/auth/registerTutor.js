import { formActionDefault, supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export function useRegisterTutor() {
  const router = useRouter()

  const formDataDefault = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    subjects: [], // Array of subject IDs
    bio: '',
    education: '',
    hourlyRate: '',
    availability: [], // Array of available time slots
  }

  const formData = ref({ ...formDataDefault })
  const formAction = ref({ ...formActionDefault })
  const refVForm = ref()

  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.value.email,
        password: formData.value.password,
      })

      if (authError) throw authError

      // 2. Create profile record
      const { error: profileError } = await supabase.from('profiles').insert({
        auth_users_id: authData.user.id,
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        email: formData.value.email,
        role: 'Tutor',
        bio: formData.value.bio,
        education: formData.value.education,
        hourly_rate: formData.value.hourlyRate,
      })

      if (profileError) throw profileError

      formAction.value.formSuccessMessage = 'Tutor registration successful!'
      router.replace('/dashboard')
    } catch (error) {
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    } finally {
      refVForm.value?.reset()
      formAction.value.formProcess = false
    }
  }

  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
      if (valid) onSubmit()
    })
  }

  return { formData, formAction, refVForm, onFormSubmit }
}
