import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Mic, Square } from 'lucide-react'
import { useChatContext } from '../../contexts/ChatContext'
import IconButton from '../ui/IconButton'

const ChatInput = ({ disabled }) => {
  const { sendMessage } = useChatContext()
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      sendMessage(input)
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 p-3 bg-white dark:bg-dark-300 rounded-2xl border border-gray-200 dark:border-dark-400 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
        <IconButton
          icon={Paperclip}
          onClick={() => console.log('Attach file')}
          size="md"
          tooltip="Attach file"
          type="button"
        />

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 resize-none bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 max-h-48"
          rows="1"
        />

        <div className="flex items-center gap-2">
          <IconButton
            icon={isRecording ? Square : Mic}
            onClick={toggleRecording}
            size="md"
            tooltip={isRecording ? 'Stop recording' : 'Start recording'}
            type="button"
            className={isRecording ? 'text-red-500' : ''}
          />

          <IconButton
            icon={Send}
            onClick={handleSubmit}
            size="md"
            tooltip="Send message"
            disabled={disabled || !input.trim()}
            type="submit"
            className="text-primary-500 hover:text-primary-600 disabled:text-gray-300"
          />
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>{input.length} / 10000</span>
      </div>
    </form>
  )
}

export default ChatInput;