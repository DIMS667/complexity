//useChat.js
import { useChatContext } from '../contexts/ChatContext'

export const useChat = () => {
  const context = useChatContext()
  
  return {
    // Conversations
    conversations: context.conversations,
    currentConversationId: context.currentConversationId,
    currentConversation: context.currentConversationId 
      ? context.conversations[context.currentConversationId] 
      : null,
    
    // Actions
    createNewConversation: context.createNewConversation,
    deleteConversation: context.deleteConversation,
    renameConversation: context.renameConversation,
    setCurrentConversationId: context.setCurrentConversationId,
    clearConversation: context.clearConversation,
    
    // Messages
    sendMessage: context.sendMessage,
    editMessage: context.editMessage,
    regenerateMessage: context.regenerateMessage,
    
    // Models
    selectedModel: context.selectedModel,
    setSelectedModel: context.setSelectedModel,
    models: context.models,
    
    // States
    isGenerating: context.isGenerating,
    
    // Computed
    hasConversations: Object.keys(context.conversations).length > 0,
    messageCount: context.currentConversationId 
      ? context.conversations[context.currentConversationId]?.messages.length || 0
      : 0
  }
}