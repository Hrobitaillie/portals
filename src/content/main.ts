import { createApp } from 'vue'
import OverlayApp from './OverlayApp.vue'
import '@/styles/styles.css' // classes 'tw-' seulement
import './content.css'

let appMounted = false
let container: HTMLDivElement | null = null

function mount() {
  if (appMounted) return
  container = document.createElement('div')
  container.id = 'portals-overlay-root'
  document.documentElement.appendChild(container)
  const app = createApp(OverlayApp)
  app.mount(container)
  appMounted = true
}

function toggleOverlay() {
  if (!appMounted) mount()
  if (!container) return
  const opened = container.getAttribute('data-open') === '1'
  container.setAttribute('data-open', opened ? '0' : '1')
  container.style.pointerEvents = opened ? 'none' : 'auto'
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type === 'PORTALS_TOGGLE') {
    toggleOverlay()
  }
})

// Petite sécurité: ESC pour fermer si ouvert
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const root = document.getElementById('portals-overlay-root')
    if (root?.getAttribute('data-open') === '1') toggleOverlay()
  }
})

// Monte à l’injection (restera masqué tant qu’on ne toggle pas)
mount()
