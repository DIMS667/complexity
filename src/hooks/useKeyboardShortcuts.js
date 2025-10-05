import { useEffect } from 'react'

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check each shortcut
      shortcuts.forEach(({ key, ctrlKey, shiftKey, altKey, callback }) => {
        const keyMatch = event.key.toLowerCase() === key.toLowerCase()
        const ctrlMatch = ctrlKey ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey
        const shiftMatch = shiftKey ? event.shiftKey : !event.shiftKey
        const altMatch = altKey ? event.altKey : !event.altKey
        
        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          event.preventDefault()
          callback(event)
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcuts])
}

// Common keyboard shortcuts
export const DEFAULT_SHORTCUTS = {
  NEW_CHAT: { key: 'n', ctrlKey: true, description: 'New chat' },
  SEARCH: { key: '/', ctrlKey: true, description: 'Search conversations' },
  TOGGLE_SIDEBAR: { key: 'b', ctrlKey: true, description: 'Toggle sidebar' },
  SETTINGS: { key: ',', ctrlKey: true, description: 'Open settings' },
  EXPORT: { key: 'e', ctrlKey: true, shiftKey: true, description: 'Export conversation' },
  CLEAR: { key: 'l', ctrlKey: true, description: 'Clear conversation' },
  DELETE: { key: 'd', ctrlKey: true, shiftKey: true, description: 'Delete conversation' }
}