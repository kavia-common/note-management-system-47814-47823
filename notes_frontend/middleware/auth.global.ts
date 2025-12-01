import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const { token } = useAuth()
  const isAuthed = !!token.value

  const isAuthRoute = to.path.startsWith('/auth')
  const requiresAuth = !isAuthRoute

  if (requiresAuth && !isAuthed) {
    return navigateTo('/auth/login')
  }

  if (isAuthRoute && isAuthed) {
    return navigateTo('/')
  }
})
