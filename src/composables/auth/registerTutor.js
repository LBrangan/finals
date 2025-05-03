import { supabase } from '@/utils/supabase'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { formActionDefault } from '@/utils/supabase'

// Auth Store Definition
export const useAuthUserStore = defineStore('authUser', () => {
  const userData = ref(null)
  const authPages = ref([])
  const authBranchIds = ref([])
  const userRole = ref(null)

  const userRoleComputed = computed(() => {
    if (!userData.value) return null
    return userData.value.role === 'tutor' ? 'Tutor' : 'Tutee'
  })

  function $reset() {
    userData.value = null
    authPages.value = []
    authBranchIds.value = []
  }

  async function isAuthenticated() {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      const { id, email, user_metadata } = data.session.user
      userData.value = { id, email, ...user_metadata }
    }
    return !!data.session
  }

  async function getUserInformation() {
    const {
      data: {
        user: { id, email, user_metadata },
      },
    } = await supabase.auth.getUser()
    userData.value = { id, email, ...user_metadata }
  }

  async function getAuthPages(name) {
    const { data } = await supabase
      .from('user_roles')
      .select('*, pages: user_role_pages (page)')
      .eq('user_role', name)
    if (data.length > 0) authPages.value = data[0].pages.map((p) => p.page)
  }

  async function getAuthBranchIds() {
    const { data } = await supabase
      .from('branches')
      .select('id')
      .in('name', userData.value.branch.split(','))
    authBranchIds.value = data.map((b) => b.id)
  }

  async function updateUserInformation(updatedData) {
    const {
      data: {
        user: { id, email, user_metadata },
      },
      error,
    } = await supabase.auth.updateUser({
      data: { ...updatedData },
    })
    if (error) {
      return { error }
    } else if (user_metadata) {
      userData.value = { id, email, ...user_metadata }
      return { data: userData.value }
    }
  }

  async function updateUserImage(file) {
    const { data, error } = await supabase.storage
      .from('LearnMate')
      .upload('avatars/' + userData.value.id + '-avatar.png', file, {
        cacheControl: '3600',
        upsert: true,
      })
    if (error) {
      return { error }
    } else if (data) {
      const { data: imageData } = supabase.storage.from('shirlix').getPublicUrl(data.path)
      return await updateUserInformation({ ...userData.value, image_url: imageData.publicUrl })
    }
  }

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (profile) {
        userData.value = profile
        userRole.value = profile.role
      }
    }
  }

  return {
    userData,
    userRole: userRoleComputed,
    authPages,
    authBranchIds,
    $reset,
    isAuthenticated,
    getUserInformation,
    getAuthPages,
    getAuthBranchIds,
    updateUserInformation,
    updateUserImage,
    fetchUser,
  }
})

// Register Tutor Composable
export function useRegisterTutor() {
  const router = useRouter()
  const authStore = useAuthUserStore()

  const formData = ref({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    bio: '',
    program: '',
  })

  const formAction = ref({ ...formActionDefault })
  const refVForm = ref()

  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.value.email,
        password: formData.value.password,
      })

      if (authError) throw authError

      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        email: formData.value.email,
        role: 'Tutor',
        bio: formData.value.bio,
        program: formData.value.program,
      })

      if (profileError) throw profileError

      await authStore.fetchUser()
      formAction.value.formSuccessMessage = 'Registration successful!'
      router.replace('/tutor/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      formAction.value.formErrorMessage = error.message
    } finally {
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
