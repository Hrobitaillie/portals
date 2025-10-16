<template>
  <!-- Backdrop clickable -->
  <div
    :class="[
      'fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200',
      isOpen ? 'opacity-100' : 'opacity-0'
    ]"
    @click.self="close"
  />

  <!-- Pane principal -->
  <div
    :class="[
      'fixed inset-0 flex items-center justify-center transition-all duration-200',
      isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3'
    ]"
  >
    <div class="w-[min(1100px,92vw)] h-[min(700px,86vh)] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-black/5 p-4 flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between gap-2 mb-3">
        <input
          v-model="q"
          @keydown.enter="submitSearch"
          placeholder="Rechercher (espaces, liens, notes) ou ↵ pour web…"
          class="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2 outline-none focus:ring ring-indigo-500/40"
        />
        <button @click="close" class="px-3 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600">
          Fermer (Esc)
        </button>
      </div>

      <!-- Contenu (placeholder MVP) -->
      <div class="grid grid-cols-12 gap-3 flex-1 overflow-auto">
        <div class="col-span-12">
          <p class="text-sm opacity-70">MVP: ici on affichera les espaces en bento (drag & resize).
             Pour l’instant, tape une requête et ↵ pour lancer une recherche web.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'

// Props pour recevoir l'état réactif depuis le parent
const props = defineProps<{
  isOpen: boolean
}>()

// Emit pour notifier le parent
const emit = defineEmits<{
  close: []
}>()

const q = ref('')
// Utiliser toRef pour rendre la prop réactive
const isOpen = toRef(props, 'isOpen')

function close() {
  emit('close')
}

function submitSearch() {
  const query = q.value.trim()
  if (!query) return
  // Moteur par défaut (configurable plus tard)
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
  window.open(url, '_blank')
}
</script>

<style scoped>
/* évite la sélection pendant drag futur */
</style>
