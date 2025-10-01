<template>
  <!-- Backdrop clickable -->
  <div
    class="fixed inset-0 bg-black/40 backdrop-blur-sm opacity-0 transition-opacity duration-200"
    :class="{ 'opacity-100': isOpen }"
    @click.self="close"
  />

  <!-- Pane principal -->
  <div
    class="fixed inset-0 flex items-center justify-center opacity-0 translate-y-3 transition-all duration-200"
    :class="{ 'opacity-100 translate-y-0 pointer-events-auto': isOpen }"
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
import { onMounted, ref, computed } from 'vue'

const q = ref('')
const isOpen = ref(false)

function syncIsOpenFromRoot() {
  const root = document.getElementById('portals-overlay-root')
  isOpen.value = root?.getAttribute('data-open') === '1'
}

function close() {
  // update local state immediately so the DOM reacts without waiting for the roundtrip
  isOpen.value = false
  chrome.runtime.sendMessage({ type: 'PORTALS_TOGGLE' }) // reboucle sur background → content
}

function submitSearch() {
  const query = q.value.trim()
  if (!query) return
  // Moteur par défaut (configurable plus tard)
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
  window.open(url, '_blank')
}


chrome.runtime.onMessage.addListener((message) => {
  // keep in sync with the container attribute toggled from `src/content/main.ts`
  // message object may be undefined-ish in some contexts, guard safely
  console.log(message)
  if (message?.type === 'PORTALS_TOGGLE') {
    syncIsOpenFromRoot()
  }
})


onMounted(() => {
  // initialize state from the container (mount happens in content/main.ts)
  syncIsOpenFromRoot()
})
</script>

<style scoped>
/* évite la sélection pendant drag futur */
</style>
