import Message from './Message'

const MessageList = ({ messages, conversationId }) => {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <p>No messages yet. Start a conversation!</p>
      </div>
    )
  }

  return (
    <div className="py-8 px-4">
      {messages.map((message) => (
        <Message 
          key={message.id} 
          message={message}
          conversationId={conversationId}
        />
      ))}
    </div>
  )
}

export default MessageList;