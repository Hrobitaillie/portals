<template>
    <OverlayApp v-if="overlayStore.isOpen" :isOpen="overlayStore.isOpen" @close="overlayStore.close" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useOverlayStore } from '@/shared/overlayStore'
import OverlayApp from './OverlayApp.vue'

const overlayStore = useOverlayStore()

// Écouter les messages Chrome pour toggle l'overlay
onMounted(() => {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type === 'PORTALS_TOGGLE') {
      overlayStore.toggle()
    }
  })

  // Écouter la touche ESC pour fermer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlayStore.isOpen) {
      overlayStore.close()
    }
  })
})
</script>
