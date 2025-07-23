import { ref } from 'vue'
import type { User } from '@supabase/supabase-js'
import { supabase } from 'boot/supabase'

const user = ref<User | null>(null)

// Recupera usuário inicial (em caso de sessão existente)
supabase.auth.getUser().then(
  ({ data, error }) => {
    if (!error) {
      user.value = data.user
    }
  },
  (err) => {
    // Optional: handle unexpected errors
    console.error('Failed to get user:', err)
  }
)

// Escuta mudanças na autenticação
supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user || null
})

export default function useAuthUser() {
  return { user }
}
