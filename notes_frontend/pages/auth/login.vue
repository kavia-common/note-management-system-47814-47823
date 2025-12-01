<template>
  <div class="auth-wrap">
    <div class="auth-card card">
      <h1>Login</h1>
      <p class="muted">Welcome back! Sign in to continue.</p>

      <form @submit.prevent="onSubmit">
        <div class="field">
          <label>Email</label>
          <input v-model="email" type="email" required class="input" placeholder="you@example.com" />
        </div>
        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password" required class="input" placeholder="••••••••" />
        </div>

        <div class="actions">
          <button class="btn btn-primary" type="submit" :disabled="pending">
            {{ pending ? 'Signing in...' : 'Login' }}
          </button>
          <NuxtLink to="/auth/register" class="btn">Register</NuxtLink>
        </div>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: false,
  title: 'Login'
})

const { login } = useAuth()
const email = ref('')
const password = ref('')
const pending = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  errorMsg.value = ''
  pending.value = true
  try {
    await login({ email: email.value, password: password.value })
    navigateTo('/')
  } catch (e: any) {
    errorMsg.value = e?.message || 'Login failed'
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.auth-wrap {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 24px;
}
.auth-card {
  width: 100%;
  max-width: 420px;
}
h1 { margin: 0 0 8px; }
.muted { color: var(--muted); margin-bottom: 16px; }
.field { margin: 12px 0; display: grid; gap: 6px; }
label { font-size: 14px; color: var(--muted); }
.actions { display: flex; gap: 8px; margin-top: 12px; }
.error { color: var(--error); margin-top: 10px; }
</style>
