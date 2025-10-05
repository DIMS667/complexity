import { Bot } from 'lucide-react'

const TypingIndicator = () => {
  return (
    <div className="chat-message mb-6 px-4">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 text-white flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
        </div>
        
        <div className="flex-1 max-w-2xl">
          <div className="inline-block p-3 rounded-lg bg-white dark:bg-dark-300 border border-gray-200 dark:border-dark-400">
            <div className="flex items-center gap-1">
              <span className="typing-dot animate-pulse-dot"></span>
              <span className="typing-dot animate-pulse-dot"></span>
              <span className="typing-dot animate-pulse-dot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator;