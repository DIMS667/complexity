import { MessageSquare, MoreVertical, Trash2, Edit2, Pin, Archive } from 'lucide-react'
import { useState } from 'react'
import { useChatContext } from '../../contexts/ChatContext'
import { formatDate } from '../../utils/formatters'
import Dropdown from '../ui/Dropdown'
import IconButton from '../ui/IconButton'

const ConversationList = ({ searchQuery }) => {
  const { 
    conversations, 
    currentConversationId, 
    setCurrentConversationId, 
    deleteConversation,
    renameConversation 
  } = useChatContext()
  
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  // Filter and sort conversations
  const filteredConversations = Object.values(conversations)
    .filter(conv => 
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.messages.some(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  // Group conversations by date
  const groupedConversations = filteredConversations.reduce((groups, conv) => {
    const date = new Date(conv.updatedAt)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const lastWeek = new Date(today)
    lastWeek.setDate(lastWeek.getDate() - 7)
    const lastMonth = new Date(today)
    lastMonth.setDate(lastMonth.getDate() - 30)

    let group
    if (date.toDateString() === today.toDateString()) {
      group = 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      group = 'Yesterday'
    } else if (date > lastWeek) {
      group = 'This Week'
    } else if (date > lastMonth) {
      group = 'This Month'
    } else {
      group = 'Older'
    }

    if (!groups[group]) groups[group] = []
    groups[group].push(conv)
    return groups
  }, {})

  const handleRename = (id) => {
    if (editingId === id && editTitle.trim()) {
      renameConversation(id, editTitle)
      setEditingId(null)
      setEditTitle('')
    }
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      deleteConversation(id)
    }
  }

  const getMenuItems = (conv) => [
    { 
      label: 'Rename', 
      icon: Edit2, 
      onClick: () => {
        setEditingId(conv.id)
        setEditTitle(conv.title)
      } 
    },
    { label: 'Pin', icon: Pin, onClick: () => console.log('Pin', conv.id) },
    { label: 'Archive', icon: Archive, onClick: () => console.log('Archive', conv.id) },
    { divider: true },
    { 
      label: 'Delete', 
      icon: Trash2, 
      onClick: () => handleDelete(conv.id),
      danger: true 
    }
  ]

  if (filteredConversations.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        {searchQuery ? 'No conversations found' : 'No conversations yet'}
      </div>
    )
  }

  return (
    <div className="p-2">
      {Object.entries(groupedConversations).map(([group, convs]) => (
        <div key={group} className="mb-4">
          <h3 className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            {group}
          </h3>
          
          {convs.map(conv => (
            <div key={conv.id} className="group relative">
              {editingId === conv.id ? (
                <div className="flex items-center gap-2 px-3 py-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => handleRename(conv.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename(conv.id)
                      if (e.key === 'Escape') {
                        setEditingId(null)
                        setEditTitle('')
                      }
                    }}
                    className="flex-1 px-2 py-1 bg-gray-100 dark:bg-dark-400 rounded border border-primary-500 focus:outline-none text-sm"
                    autoFocus
                  />
                </div>
              ) : (
                <div
                  className={`sidebar-item ${currentConversationId === conv.id ? 'sidebar-item-active' : ''}`}
                  onClick={() => setCurrentConversationId(conv.id)}
                >
                  <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {conv.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {conv.messages.length} messages · {formatDate(conv.updatedAt)}
                    </p>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dropdown
                      trigger={
                        <IconButton
                          icon={MoreVertical}
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                      }
                      items={getMenuItems(conv)}
                      align="right"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ConversationList;