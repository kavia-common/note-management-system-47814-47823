<template>
  <div class="min-h-screen bg-background text-text">
    <NuxtRouteAnnouncer />
    <HeaderNav />

    <div class="app-layout">
      <aside class="sidebar">
        <nav>
          <ul>
            <li><NuxtLink to="/" class="nav-link">All Notes</NuxtLink></li>
            <li><NuxtLink to="/notes/create" class="nav-link">Create Note</NuxtLink></li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Root application with Ocean Professional theme and layout.
 * Provides a header, sidebar, and main content area.
 * Route guard middleware redirects based on auth state (set globally in middleware/auth.global.ts).
 */
</script>

<style>
:root {
  --primary: #2563EB;
  --secondary: #F59E0B;
  --success: #F59E0B;
  --error: #EF4444;
  --background: #f9fafb;
  --surface: #ffffff;
  --text: #111827;
  --muted: #6B7280;
  --border: #E5E7EB;
  --gradient-from: rgba(59, 130, 246, 0.10);
  --gradient-to: #f9fafb;
}

* { box-sizing: border-box; }

body, html, #__nuxt {
  height: 100%;
}

.bg-background { background: var(--background); }
.text-text { color: var(--text); }

.app-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.sidebar {
  background: linear-gradient(180deg, var(--gradient-from), var(--gradient-to));
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  height: fit-content;
  position: sticky;
  top: 16px;
}

.sidebar .nav-link {
  display: block;
  padding: 10px 12px;
  color: var(--text);
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all .2s ease;
  margin-bottom: 8px;
}

.sidebar .nav-link:hover {
  background: var(--surface);
  border-color: var(--border);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.content {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  min-height: calc(100vh - 64px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  transition: all .2s ease;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.btn-danger {
  background: var(--error);
  color: white;
  border-color: var(--error);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.input, .textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: all .2s ease;
  color: var(--text);
}

.input:focus, .textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
}

.card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 12px;
  padding: 16px;
  transition: box-shadow .2s ease, transform .2s ease, border-color .2s ease;
}

.card:hover {
  transform: translateY(-1px);
  border-color: #dfe3e8;
  box-shadow: 0 8px 22px rgba(0,0,0,0.08);
}
</style>
