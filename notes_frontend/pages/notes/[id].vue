<template>
  <div class="card">
    <div class="header-row">
      <h2>Edit Note</h2>
      <div class="right">
        <button class="btn btn-danger" @click="onDelete" :disabled="deleting">{{ deleting ? 'Deleting...' : 'Delete' }}</button>
      </div>
    </div>

    <form @submit.prevent="onSave">
      <div class="field">
        <label>Title</label>
        <input v-model="title" class="input" required />
      </div>
      <div class="field">
        <label>Content</label>
        <textarea v-model="content" class="textarea" rows="12" required />
      </div>
      <div class="actions">
        <button type="button" class="btn" @click="$router.push('/')">Back</button>
        <button type="submit" class="btn btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save Changes' }}</button>
      </div>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/types'
import { useApi } from '~/composables/useApi'

definePageMeta({
  title: 'Edit Note'
})

const route = useRoute()
const id = computed(() => route.params.id as string)
const { getNote, updateNote, deleteNote } = useApi()

const title = ref('')
const content = ref('')
const saving = ref(false)
const deleting = ref(false)
const errorMsg = ref('')

async function load() {
  errorMsg.value = ''
  try {
    const n: Note = await getNote(id.value)
    title.value = n.title || ''
    content.value = n.content || ''
  } catch (e: any) {
    errorMsg.value = e?.message || 'Failed to load note'
  }
}

async function onSave() {
  errorMsg.value = ''
  saving.value = true
  try {
    await updateNote(id.value, { title: title.value, content: content.value })
    navigateTo('/')
  } catch (e: any) {
    errorMsg.value = e?.message || 'Failed to save changes'
  } finally {
    saving.value = false
  }
}

async function onDelete() {
  if (!confirm('Delete this note?')) return
  deleting.value = true
  errorMsg.value = ''
  try {
    await deleteNote(id.value)
    navigateTo('/')
  } catch (e: any) {
    errorMsg.value = e?.message || 'Failed to delete note'
  } finally {
    deleting.value = false
  }
}

onMounted(load)
watch(id, load)
</script>

<style scoped>
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.field { margin: 12px 0; display: grid; gap: 6px; }
.actions { display: flex; gap: 8px; margin-top: 12px; }
.error { color: var(--error); margin-top: 10px; }
</style>
