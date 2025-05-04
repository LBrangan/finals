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
    program: '',
    availability: [], // Array of available time slot
    role: 'Tutor',
  }

  const formData = ref({ ...formDataDefault })
  const formAction = ref({ ...formActionDefault })
  const refVForm = ref()

  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          firstname: formData.value.firstname,
          lastname: formData.value.lastname,
          role: formData.value.role || 'Tutor',
        },
      },
    })

    if (error) {
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    } else if (data) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: data.user.id, // Changed from user_id to id
          firstname: formData.value.firstname,
          lastname: formData.value.lastname,
          email: formData.value.email,
          role: 'Tutor',
          created_at: new Date(),
        },
      ])
      if (profileError) {
        formAction.value.formErrorMessage = profileError.message
        return
      }

      formAction.value.formSuccessMessage = 'Tutor registration successful!'
      router.replace('tutor/dashboard')
    }
    refVForm.value?.reset()
    formAction.value.formProcess = false
  }

  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
      if (valid) onSubmit()
    })
  }

  return { formData, formAction, refVForm, onFormSubmit }
}
