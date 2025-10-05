import { useState } from 'react'
import { User, Bot, Copy, Check, Edit2, RefreshCw } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useChatContext } from '../../contexts/ChatContext'
import IconButton from '../ui/IconButton'

const Message = ({ message, conversationId }) => {
  const { editMessage, regenerateMessage, isGenerating } = useChatContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content)
  const [copied, setCopied] = useState(false)
  
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEdit = () => {
    if (isEditing && editContent !== message.content) {
      editMessage(conversationId, message.id, editContent)
    }
    setIsEditing(!isEditing)
  }

  const handleRegenerate = () => {
    if (!isGenerating && !isUser) {
      regenerateMessage(conversationId, message.id)
    }
  }

  return (
    <div className={`chat-message group mb-6 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : ''}`}>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isUser
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                : 'bg-gradient-to-br from-green-500 to-teal-600 text-white'
            }`}
          >
            {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          <div className={`${isUser ? 'text-right' : ''}`}>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isUser ? 'You' : message.model || 'Assistant'}
              {message.edited && ' (edited)'}
              {message.regenerated && ' (regenerated)'}
            </span>
          </div>
          
          <div className={`mt-1 ${isUser ? 'text-right' : ''}`}>
            {isEditing ? (
              <div className="flex gap-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 p-3 bg-white dark:bg-dark-300 border border-gray-200 dark:border-dark-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  rows="3"
                />
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleEdit}
                    className="px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setEditContent(message.content)
                    }}
                    className="px-3 py-1 bg-gray-300 dark:bg-dark-400 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-dark-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`inline-block text-left p-3 rounded-lg ${
                  isUser 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white dark:bg-dark-300 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-dark-400'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  // ⬇️ Wrapper avec les classes (prose, etc.), plus de className sur <ReactMarkdown />
                  <div className="message-content prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action buttons */}
          {!isEditing && (
            <div
              className={`mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                isUser ? 'justify-end' : ''
              }`}
            >
              <IconButton
                icon={copied ? Check : Copy}
                onClick={handleCopy}
                size="sm"
                tooltip={copied ? 'Copied!' : 'Copy'}
              />
              {isUser && (
                <IconButton
                  icon={Edit2}
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  tooltip="Edit"
                />
              )}
              {!isUser && (
                <IconButton
                  icon={RefreshCw}
                  onClick={handleRegenerate}
                  size="sm"
                  tooltip="Regenerate"
                  disabled={isGenerating}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
