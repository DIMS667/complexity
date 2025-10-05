import { useState } from 'react'
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Lock, 
  Database, 
  Keyboard, 
  Download,
  Trash2,
  Save,
  RotateCcw
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useChatContext } from '../../contexts/ChatContext'
import { clearAllStoredData } from '../../utils/storage'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { LANGUAGES, DEFAULT_SHORTCUTS } from '../../utils/constants'

const SettingsPanel = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useTheme()
  const { conversations } = useChatContext()
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    language: 'en',
    fontSize: 'medium',
    autoSave: true,
    notifications: true,
    soundEffects: false,
    enterToSend: true,
    showTimestamps: true,
    compactMode: false,
    temperature: 0.7,
    maxTokens: 2000,
    streamResponse: true
  })

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'shortcuts', label: 'Shortcuts', icon: Keyboard },
    { id: 'data', label: 'Data & Storage', icon: Database }
  ]

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'x-large', label: 'Extra Large' }
  ]

  const handleSave = () => {
    localStorage.setItem('ai_assistant_settings', JSON.stringify(settings))
    onClose()
  }

  const handleClearData = () => {
    if (confirm('This will delete all conversations and settings. Are you sure?')) {
      clearAllStoredData()
      window.location.reload()
    }
  }

  const handleExportData = () => {
    const data = {
      conversations,
      settings,
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-assistant-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      size="xl"
    >
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg
                    transition-colors text-left
                    ${activeTab === tab.id
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-[400px]">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-400 rounded-lg bg-white dark:bg-dark-300 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
                    className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-dark-400 border-gray-300 dark:border-dark-500 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Auto-save conversations
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                    className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-dark-400 border-gray-300 dark:border-dark-500 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable notifications
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.enterToSend}
                    onChange={(e) => setSettings({ ...settings, enterToSend: e.target.checked })}
                    className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-dark-400 border-gray-300 dark:border-dark-500 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Press Enter to send (Shift+Enter for new line)
                  </span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Theme
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => !isDark && toggleTheme()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                      !isDark
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : 'border-gray-300 dark:border-dark-400 hover:bg-gray-50 dark:hover:bg-dark-300'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </button>
                  <button
                    onClick={() => isDark && toggleTheme()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                      isDark
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : 'border-gray-300 dark:border-dark-400 hover:bg-gray-50 dark:hover:bg-dark-300'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Size
                </label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-400 rounded-lg bg-white dark:bg-dark-300 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {fontSizes.map(size => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.showTimestamps}
                    onChange={(e) => setSettings({ ...settings, showTimestamps: e.target.checked })}
                    className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-dark-400 border-gray-300 dark:border-dark-500 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show message timestamps
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.compactMode}
                    onChange={(e) => setSettings({ ...settings, compactMode: e.target.checked })}
                    className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-dark-400 border-gray-300 dark:border-dark-500 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Compact mode
                  </span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Privacy Notice
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  All conversations are stored locally in your browser. No data is sent to external servers.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Data Management
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={handleExportData}
                    icon={Download}
                    variant="default"
                    fullWidth
                  >
                    Export All Data
                  </Button>
                  <Button
                    onClick={handleClearData}
                    icon={Trash2}
                    variant="danger"
                    fullWidth
                  >
                    Clear All Data
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shortcuts' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keyboard shortcuts to navigate faster
              </p>
              <div className="space-y-2">
                {Object.entries(DEFAULT_SHORTCUTS).map(([key, shortcut]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-300 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                    <kbd className="px-2 py-1 bg-white dark:bg-dark-400 border border-gray-300 dark:border-dark-500 rounded text-xs font-mono">
                      {shortcut.ctrlKey && 'Ctrl + '}
                      {shortcut.shiftKey && 'Shift + '}
                      {shortcut.key.toUpperCase()}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Storage Usage
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Conversations
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {Object.keys(conversations).length} stored
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Messages
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {Object.values(conversations).reduce((acc, conv) => acc + conv.messages.length, 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Model Parameters
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Temperature ({settings.temperature})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                      className="w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Max Tokens ({settings.maxTokens})
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="4000"
                      step="100"
                      value={settings.maxTokens}
                      onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) })}
                      className="w-full mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-400 flex justify-end gap-3">
        <Button
          onClick={() => setSettings({})}
          icon={RotateCcw}
          variant="ghost"
        >
          Reset
        </Button>
        <Button
          onClick={onClose}
          variant="default"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          icon={Save}
          variant="primary"
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  )
}

export default SettingsPanel