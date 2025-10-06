import { Plus, Search, MessageSquare, Trash2, Edit2, X } from 'lucide-react'
import { useState } from 'react'
import { useChatContext } from '../../contexts/ChatContext'
import ConversationList from '../features/ConversationList'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'

const Sidebar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { createNewConversation } = useChatContext()

  const handleNewChat = () => {
    createNewConversation()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-72 bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-400
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-dark-400">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Conversations
              </h2>
              <IconButton
                icon={X}
                onClick={onClose}
                className="lg:hidden"
              />
            </div>
            
            <Button
              onClick={handleNewChat}
              icon={Plus}
              fullWidth
              variant="primary"
            >
              New Chat
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-dark-400">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-300 border border-gray-200 dark:border-dark-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            <ConversationList searchQuery={searchQuery} />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-400">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              DIMITRI IA, MERCI GEMINI
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar;