chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-overlay') {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true })
    const tab = tabs[0]
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, { type: 'PORTALS_TOGGLE' })
    }
  }
})

// Permettre aussi le toggle depuis l’UI (bouton "Fermer")
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg?.type === 'PORTALS_TOGGLE') {
    if (sender.tab?.id) {
      chrome.tabs.sendMessage(sender.tab.id, { type: 'PORTALS_TOGGLE' })
    }
  }
})
