<template>
  <div class="auth-wrap">
    <div class="auth-card card">
      <h1>Create account</h1>
      <p class="muted">Join Ocean Notes to manage your knowledge.</p>

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
            {{ pending ? 'Creating...' : 'Register' }}
          </button>
          <NuxtLink to="/auth/login" class="btn">Back to Login</NuxtLink>
        </div>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success">{{ successMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: false,
  title: 'Register'
})

const { register } = useAuth()
const email = ref('')
const password = ref('')
const pending = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

async function onSubmit() {
  errorMsg.value = ''
  successMsg.value = ''
  pending.value = true
  try {
    await register({ email: email.value, password: password.value })
    successMsg.value = 'Account created. Redirecting to login...'
    setTimeout(() => navigateTo('/auth/login'), 900)
  } catch (e: any) {
    errorMsg.value = e?.message || 'Registration failed'
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
.success { color: var(--secondary); margin-top: 10px; }
</style>
