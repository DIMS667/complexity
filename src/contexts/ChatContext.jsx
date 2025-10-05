import { createContext, useState, useContext, useEffect } from 'react'
import { generateId, getStoredData, setStoredData } from '../utils/storage'
import { generateAIResponse } from '../utils/messageGenerator'
import conversationsData from '../data/conversations.json'
import modelsData from '../data/models.json'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState({})
  const [currentConversationId, setCurrentConversationId] = useState(null)
  const [selectedModel, setSelectedModel] = useState('gpt-4')
  const [isGenerating, setIsGenerating] = useState(false)
  const [models] = useState(modelsData)

  // Load conversations from localStorage on mount
  useEffect(() => {
    const stored = getStoredData('conversations')
    if (stored && Object.keys(stored).length > 0) {
      setConversations(stored)
      const lastConvId = getStoredData('lastConversationId')
      if (lastConvId && stored[lastConvId]) {
        setCurrentConversationId(lastConvId)
      }
    } else {
      // Load default conversations if none exist
      setConversations(conversationsData)
      const firstId = Object.keys(conversationsData)[0]
      if (firstId) setCurrentConversationId(firstId)
    }
  }, [])

  // Save to localStorage whenever conversations change
  useEffect(() => {
    if (Object.keys(conversations).length > 0) {
      setStoredData('conversations', conversations)
    }
    if (currentConversationId) {
      setStoredData('lastConversationId', currentConversationId)
    }
  }, [conversations, currentConversationId])

  const createNewConversation = (title = 'New Chat') => {
    const id = generateId()
    const newConversation = {
      id,
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      model: selectedModel
    }
    
    setConversations(prev => ({
      ...prev,
      [id]: newConversation
    }))
    setCurrentConversationId(id)
    return id
  }

  const deleteConversation = (id) => {
    setConversations(prev => {
      const updated = { ...prev }
      delete updated[id]
      return updated
    })
    
    if (currentConversationId === id) {
      const remainingIds = Object.keys(conversations).filter(convId => convId !== id)
      setCurrentConversationId(remainingIds[0] || null)
    }
  }

  const renameConversation = (id, newTitle) => {
    setConversations(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        title: newTitle,
        updatedAt: new Date().toISOString()
      }
    }))
  }

  const sendMessage = async (content) => {
    if (!currentConversationId || !content.trim() || isGenerating) return

    const userMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    }

    // Add user message
    setConversations(prev => ({
      ...prev,
      [currentConversationId]: {
        ...prev[currentConversationId],
        messages: [...prev[currentConversationId].messages, userMessage],
        updatedAt: new Date().toISOString()
      }
    }))

    // Generate AI response
    setIsGenerating(true)
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const aiResponse = {
      id: generateId(),
      role: 'assistant',
      content: generateAIResponse(content, selectedModel),
      timestamp: new Date().toISOString(),
      model: selectedModel
    }

    setConversations(prev => ({
      ...prev,
      [currentConversationId]: {
        ...prev[currentConversationId],
        messages: [...prev[currentConversationId].messages, aiResponse],
        updatedAt: new Date().toISOString()
      }
    }))

    setIsGenerating(false)
  }

  const editMessage = (conversationId, messageId, newContent) => {
    setConversations(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        messages: prev[conversationId].messages.map(msg =>
          msg.id === messageId ? { ...msg, content: newContent, edited: true } : msg
        ),
        updatedAt: new Date().toISOString()
      }
    }))
  }

  const regenerateMessage = async (conversationId, messageId) => {
    const conversation = conversations[conversationId]
    if (!conversation) return

    const messageIndex = conversation.messages.findIndex(m => m.id === messageId)
    if (messageIndex === -1) return

    // Find the previous user message
    let previousUserMessage = ''
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (conversation.messages[i].role === 'user') {
        previousUserMessage = conversation.messages[i].content
        break
      }
    }

    if (!previousUserMessage) return

    setIsGenerating(true)
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const newContent = generateAIResponse(previousUserMessage, selectedModel)
    
    setConversations(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        messages: prev[conversationId].messages.map(msg =>
          msg.id === messageId 
            ? { ...msg, content: newContent, regenerated: true, timestamp: new Date().toISOString() }
            : msg
        ),
        updatedAt: new Date().toISOString()
      }
    }))

    setIsGenerating(false)
  }

  const clearConversation = (id) => {
    setConversations(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        messages: [],
        updatedAt: new Date().toISOString()
      }
    }))
  }

  const value = {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    selectedModel,
    setSelectedModel,
    models,
    isGenerating,
    createNewConversation,
    deleteConversation,
    renameConversation,
    sendMessage,
    editMessage,
    regenerateMessage,
    clearConversation
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}