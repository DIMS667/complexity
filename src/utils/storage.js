// Local storage keys
const STORAGE_KEYS = {
  CONVERSATIONS: 'ai_assistant_conversations',
  LAST_CONVERSATION: 'ai_assistant_last_conversation',
  SETTINGS: 'ai_assistant_settings',
  THEME: 'ai_assistant_theme'
}

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Get data from localStorage
export const getStoredData = (key) => {
  try {
    const storageKey = STORAGE_KEYS[key.toUpperCase()] || key
    const item = localStorage.getItem(storageKey)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading from localStorage:`, error)
    return null
  }
}

// Set data to localStorage
export const setStoredData = (key, data) => {
  try {
    const storageKey = STORAGE_KEYS[key.toUpperCase()] || key
    localStorage.setItem(storageKey, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Error writing to localStorage:`, error)
    return false
  }
}

// Remove data from localStorage
export const removeStoredData = (key) => {
  try {
    const storageKey = STORAGE_KEYS[key.toUpperCase()] || key
    localStorage.removeItem(storageKey)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage:`, error)
    return false
  }
}

// Clear all app data from localStorage
export const clearAllStoredData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error(`Error clearing localStorage:`, error)
    return false
  }
}

// Export conversation to JSON
export const exportConversation = (conversation) => {
  const dataStr = JSON.stringify(conversation, null, 2)
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
  
  const exportFileDefaultName = `conversation-${conversation.id}-${Date.now()}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

// Import conversation from JSON
export const importConversation = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const conversation = JSON.parse(e.target.result)
        resolve(conversation)
      } catch (error) {
        reject(new Error('Invalid JSON file'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }
    
    reader.readAsText(file)
  })
}