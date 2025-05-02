import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export function useRegister() {
  // Utilize pre-defined vue functions
  const router = useRouter()

  // Load Variables
  const formDataDefault = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  }
  const formData = ref({
    ...formDataDefault,
  })
  const formAction = ref({
    ...formActionDefault,
  })
  const refVForm = ref()

  // Register Functionality
  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    const { data, error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          firstname: formData.value.firstname,
          lastname: formData.value.lastname,
          role: formData.value.role,
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
          role: formData.value.role,
          created_at: new Date(),
        },
      ])

      if (profileError) {
        formAction.value.formErrorMessage = profileError.message
        return
      }

      formAction.value.formSuccessMessage = 'Successfully Registered Account.'
      router.replace('/dashboard')
    }

    refVForm.value?.reset()
    formAction.value.formProcess = false
  }

  // Trigger Validators
  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
      if (valid) onSubmit()
    })
  }

  return { formData, formAction, refVForm, onFormSubmit }
}
