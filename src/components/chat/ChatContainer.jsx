//ChatContainer.jsx
import { useEffect, useRef } from 'react'
import { useChatContext } from '../../contexts/ChatContext'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'

const ChatContainer = ({ conversationId }) => {
  const { conversations, isGenerating } = useChatContext()
  const messagesEndRef = useRef(null)
  
  const conversation = conversations[conversationId]
  const messages = conversation?.messages || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isGenerating])

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-dark-100">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <MessageList messages={messages} conversationId={conversationId} />
          {isGenerating && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-200">
        <div className="max-w-4xl mx-auto p-4">
          <ChatInput disabled={isGenerating} />
        </div>
      </div>
    </div>
  )
}

export default ChatContainer;