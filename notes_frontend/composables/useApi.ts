import type { ApiError, LoginPayload, RegisterPayload, Note, NotePayload, LoginResponse } from '~/types'

/**
 * PUBLIC_INTERFACE
 * useApi
 * A small API client wrapping ofetch/$fetch with base URL from runtime config and JWT support.
 */
export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase?.replace(/\/$/, '') || 'http://localhost:3001'
  const token = useState<string | null>('jwt', () => null)

  const client = $fetch.create({
    baseURL,
    retry: 0,
    credentials: 'omit', // CORS-safe; backend handles Authorization
    onRequest({ options }) {
      if (!options.headers) options.headers = {}
      if (token.value) {
        (options.headers as any).Authorization = `Bearer ${token.value}`
      }
      ;(options.headers as any)['Content-Type'] = 'application/json'
      ;(options.headers as any)['Accept'] = 'application/json'
    },
    onResponseError({ response }) {
      // Normalize error and throw
      const err: ApiError = {
        status: response.status,
        message: (response._data && (response._data.message || response._data.detail)) || response.statusText || 'Request failed',
        details: response._data
      }
      throw err
    }
  })

  async function login(payload: LoginPayload): Promise<LoginResponse> {
    const data = await client<LoginResponse>('/auth/login', { method: 'POST', body: payload })
    if (data?.access_token) token.value = data.access_token
    return data
  }

  async function register(payload: RegisterPayload): Promise<void> {
    await client('/auth/register', { method: 'POST', body: payload })
  }

  async function listNotes(): Promise<Note[]> {
    return client<Note[]>('/notes', { method: 'GET' })
  }

  async function getNote(id: string | number): Promise<Note> {
    return client<Note>(`/notes/${id}`, { method: 'GET' })
  }

  async function createNote(body: NotePayload): Promise<Note> {
    return client<Note>('/notes', { method: 'POST', body })
  }

  async function updateNote(id: string | number, body: NotePayload): Promise<Note> {
    return client<Note>(`/notes/${id}`, { method: 'PUT', body })
  }

  async function deleteNote(id: string | number): Promise<void> {
    await client(`/notes/${id}`, { method: 'DELETE' })
  }

  return {
    baseURL,
    client,
    token,
    login,
    register,
    listNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
  }
}
