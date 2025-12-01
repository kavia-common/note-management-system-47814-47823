export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
}

export interface Note {
  id: string | number
  title: string
  content: string
  created_at?: string
  updated_at?: string
}

export interface NotePayload {
  title: string
  content: string
}

export interface AuthUser {
  email: string
}

export interface LoginResponse {
  access_token: string
  token_type?: string
  user?: AuthUser
}

export interface ApiError {
  status: number
  message: string
  details?: any
}
