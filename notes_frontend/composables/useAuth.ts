import type { AuthUser, LoginPayload, RegisterPayload } from '~/types'
import { useApi } from './useApi'

const STORAGE_KEY = 'ocean-notes.jwt'

/**
 * PUBLIC_INTERFACE
 * useAuth
 * Centralized auth composable with JWT persistence and helpers.
 */
export function useAuth() {
  const { login: apiLogin, register: apiRegister, token } = useApi()
  const user = useState<AuthUser | null>('user', () => null)
  const isReady = useState<boolean>('authReady', () => false)

  // initialize from storage on first use
  if (!isReady.value) {
    const saved = process.client ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      token.value = saved
      // Optionally decode or fetch profile; backend openapi doesn't expose a profile endpoint.
      // We'll just keep user minimal.
      user.value = { email: 'user' }
    }
    isReady.value = true
  }

  async function login(payload: LoginPayload) {
    const res = await apiLogin(payload)
    if (res?.access_token) {
      token.value = res.access_token
      if (process.client) localStorage.setItem(STORAGE_KEY, res.access_token)
      // If backend doesn't return user, derive from email in payload
      user.value = res.user || { email: payload.email }
    }
  }

  async function register(payload: RegisterPayload) {
    await apiRegister(payload)
  }

  function logout() {
    token.value = null
    user.value = null
    if (process.client) localStorage.removeItem(STORAGE_KEY)
  }

  return { user, token, isReady, login, register, logout }
}
