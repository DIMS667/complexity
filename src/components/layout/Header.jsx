import { useState } from 'react'
import { Menu, Sun, Moon, Settings, User, LogOut } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useChatContext } from '../../contexts/ChatContext'
import ModelSelector from '../features/ModelSelector'
import SettingsPanel from '../features/SettingsPanel'
import Dropdown from '../ui/Dropdown'
import IconButton from '../ui/IconButton'

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { isDark, toggleTheme } = useTheme()
  const { conversations, currentConversationId } = useChatContext()
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  const currentConversation = currentConversationId ? conversations[currentConversationId] : null

  const userMenuItems = [
    { label: 'Profile', icon: User, onClick: () => console.log('Profile') },
    { label: 'Settings', icon: Settings, onClick: () => setSettingsOpen(true) },
    { divider: true },
    { label: 'Logout', icon: LogOut, onClick: () => console.log('Logout'), danger: true }
  ]

  return (
    <header className="bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-dark-400 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconButton
            icon={Menu}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          />
          
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {currentConversation?.title || 'AI Assistant'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <ModelSelector />
          
          <IconButton
            icon={isDark ? Sun : Moon}
            onClick={toggleTheme}
            tooltip={isDark ? 'Light mode' : 'Dark mode'}
          />
          
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  U
                </div>
              </button>
            }
            items={userMenuItems}
            align="right"
          />
        </div>
      </div>
      
      {/* Settings Modal */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </header>
  )
}

export default Header;