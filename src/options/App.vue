<template>
  <div class="p-6 max-w-2xl mx-auto space-y-6">
    <h1 class="text-2xl font-semibold">Options</h1>

    <section class="space-y-2">
      <h2 class="text-lg font-medium">Raccourcis</h2>
      <p class="text-sm opacity-70">
        Configure le raccourci dans
        <a class="text-indigo-600"
           href="chrome://extensions/shortcuts" target="_blank" rel="noreferrer">
          chrome://extensions/shortcuts
        </a>
      </p>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-medium">Moteur de recherche</h2>
      <div class="flex gap-2">
        <select v-model="engine" class="bg-neutral-100 rounded px-2 py-1">
          <option value="ddg">DuckDuckGo</option>
          <option value="google">Google</option>
          <option value="brave">Brave</option>
        </select>
        <button @click="save" class="px-3 py-1 rounded bg-neutral-200 hover:bg-neutral-300">
          Sauver
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const engine = ref<'ddg'|'google'|'brave'>('ddg')

onMounted(async () => {
  const { engine: saved } = await chrome.storage.sync.get('engine')
  if (saved) engine.value = saved
})

async function save() {
  await chrome.storage.sync.set({ engine: engine.value })
  alert('Sauvegardé')
}
</script>
