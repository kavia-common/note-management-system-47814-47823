<template>
  <div class="card">
    <h2>Create Note</h2>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <label>Title</label>
        <input v-model="title" class="input" placeholder="Note title" required />
      </div>
      <div class="field">
        <label>Content</label>
        <textarea v-model="content" class="textarea" rows="10" placeholder="Write your note..." required />
      </div>

      <div class="actions">
        <button class="btn" type="button" @click="$router.back()">Cancel</button>
        <button class="btn btn-primary" type="submit" :disabled="pending">
          {{ pending ? 'Saving...' : 'Save' }}
        </button>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi'

definePageMeta({
  title: 'Create Note'
})

const { createNote } = useApi()
const title = ref('')
const content = ref('')
const pending = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  errorMsg.value = ''
  pending.value = true
  try {
    const created = await createNote({ title: title.value, content: content.value })
    navigateTo(`/notes/${created.id}`)
  } catch (e: any) {
    errorMsg.value = e?.message || 'Failed to create note'
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.field { margin: 12px 0; display: grid; gap: 6px; }
.actions { display: flex; gap: 8px; margin-top: 12px; }
.error { color: var(--error); margin-top: 10px; }
</style>
