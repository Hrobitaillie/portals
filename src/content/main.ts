import { createApp, type App } from 'vue'
import { pinia } from '@/shared/pinia'
import '@/styles/styles.css' // classes 'tw-' seulement
import './content.css'
import OverlayLayout from './OverlayLayout.vue'

let app: App | null = null
let container: HTMLElement | null = null

function mount() {
  // Vérifier si l'app est déjà montée
  if (app) {
    return
  }

  // Nettoyer tout container existant (utile pour le hot-reload)
  const existingContainer = document.getElementById('portals-overlay-root')
  if (existingContainer) {
    existingContainer.remove()
  }

  // Créer le container
  container = document.createElement('div')
  container.id = 'portals-overlay-root'
  document.documentElement.appendChild(container)

  // Créer et monter l'app Vue (OverlayLayout gère son propre état)
  app = createApp(OverlayLayout)
  app.use(pinia)
  app.mount(container)
}

// Monte à l'injection
mount()
