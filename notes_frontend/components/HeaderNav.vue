<template>
  <header class="header">
    <div class="container">
      <div class="brand" @click="$router.push('/')">
        <div class="logo">📝</div>
        <div class="title">
          <div class="appname">Ocean Notes</div>
          <div class="subtitle">Professional note management</div>
        </div>
      </div>
      <div class="actions">
        <template v-if="auth.user">
          <span class="welcome">Welcome, {{ auth.user.email }}</span>
          <button class="btn" @click="$router.push('/notes/create')">New Note</button>
          <button class="btn" @click="$router.push('/')">My Notes</button>
          <button class="btn" @click="onLogout">Logout</button>
        </template>
        <template v-else>
          <NuxtLink class="btn" to="/auth/login">Login</NuxtLink>
          <NuxtLink class="btn btn-primary" to="/auth/register">Register</NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const auth = useAuth()

function onLogout() {
  auth.logout()
  navigateTo('/auth/login')
}
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, var(--gradient-from), var(--gradient-to));
  border-bottom: 1px solid var(--border);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
}
.logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  font-size: 18px;
}
.title .appname {
  font-weight: 700;
  color: var(--text);
}
.subtitle {
  font-size: 12px;
  color: var(--muted);
}
.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.welcome {
  color: var(--muted);
  margin-right: 8px;
}
</style>
