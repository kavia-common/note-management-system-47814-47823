<template>
  <div>
    <div class="header-row">
      <h2>Your Notes</h2>
      <div>
        <NuxtLink class="btn btn-primary" to="/notes/create">Create Note</NuxtLink>
      </div>
    </div>

    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>

    <div class="grid">
      <article v-for="n in notes" :key="n.id" class="card" @click="$router.push(`/notes/${n.id}`)" role="button">
        <h3>{{ n.title || 'Untitled' }}</h3>
        <p class="excerpt">{{ (n.content || '').slice(0, 140) }}</p>
        <div class="meta">
          <span>Updated: {{ formatDate(n.updated_at || n.created_at) }}</span>
        </div>
      </article>
    </div>

    <p v-if="!loading && notes.length === 0" class="muted">No notes yet. Create your first one!</p>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/types'
import { useApi } from '~/composables/useApi'

definePageMeta({
  title: 'Notes'
})

const { listNotes } = useApi()
const notes = ref<Note[]>([])
const errorMsg = ref('')
const loading = ref(true)

function formatDate(v?: string) {
  if (!v) return '—'
  try { return new Date(v).toLocaleString() } catch { return v }
}

onMounted(async () => {
  try {
    notes.value = await listNotes()
  } catch (e: any) {
    errorMsg.value = e?.message || 'Failed to load notes'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}
h3 { margin: 0 0 6px; }
.excerpt { color: var(--muted); min-height: 42px; }
.meta { font-size: 12px; color: var(--muted); margin-top: 8px; }
.error { color: var(--error); margin-bottom: 8px; }
</style>
