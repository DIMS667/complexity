import { createContext, useState, useContext, useEffect } from 'react'
import { getStoredData, setStoredData } from '../utils/storage'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState([])
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine)

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = getStoredData('user')
        if (userData) {
          setUser(userData)
        } else {
          // Create default user
          const defaultUser = {
            id: 'user-1',
            name: 'User',
            email: 'user@example.com',
            avatar: null,
            preferences: {
              theme: 'system',
              language: 'en',
              notifications: true
            },
            createdAt: new Date().toISOString()
          }
          setUser(defaultUser)
          setStoredData('user', defaultUser)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true)
    const handleOffline = () => setOnlineStatus(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Handle notifications
  const addNotification = (notification) => {
    const id = Date.now().toString()
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date().toISOString()
    }
    
    setNotifications(prev => [...prev, newNotification])

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  // Update user preferences
  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates }
      setStoredData('user', updated)
      return updated
    })
  }

  const updateUserPreferences = (preferences) => {
    setUser(prev => {
      const updated = {
        ...prev,
        preferences: { ...prev.preferences, ...preferences }
      }
      setStoredData('user', updated)
      return updated
    })
  }

  // Global search
  const handleGlobalSearch = (query) => {
    setSearchQuery(query)
    // Additional search logic can be added here
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K: Global search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        // Focus search input (implement focus logic based on your search component)
      }
      
      // Ctrl/Cmd + ,: Open settings
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault()
        setSettingsOpen(true)
      }
      
      // Ctrl/Cmd + B: Toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        setSidebarOpen(prev => !prev)
      }
      
      // Escape: Close modals
      if (e.key === 'Escape') {
        setSettingsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const value = {
    // User
    user,
    updateUser,
    updateUserPreferences,
    
    // UI State
    isLoading,
    sidebarOpen,
    setSidebarOpen,
    settingsOpen,
    setSettingsOpen,
    
    // Search
    searchQuery,
    handleGlobalSearch,
    
    // Notifications
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    
    // Status
    onlineStatus
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}