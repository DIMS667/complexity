import responsesData from '../data/responses.json'

// Generate AI response based on user input and selected model
export const generateAIResponse = (userMessage, modelId) => {
  const message = userMessage.toLowerCase()
  
  // Check for specific keywords and return appropriate responses
  if (message.includes('hello') || message.includes('hi')) {
    return getRandomResponse('greetings', modelId)
  }
  
  if (message.includes('how are you')) {
    return getRandomResponse('status', modelId)
  }
  
  if (message.includes('code') || message.includes('programming')) {
    return getRandomResponse('coding', modelId)
  }
  
  if (message.includes('explain') || message.includes('what is')) {
    return getRandomResponse('explanations', modelId)
  }
  
  if (message.includes('help') || message.includes('assist')) {
    return getRandomResponse('help', modelId)
  }
  
  if (message.includes('thank')) {
    return getRandomResponse('thanks', modelId)
  }
  
  // Default response
  return getRandomResponse('general', modelId)
}

// Get random response from category
const getRandomResponse = (category, modelId) => {
  const responses = responsesData[category] || responsesData.general
  const response = responses[Math.floor(Math.random() * responses.length)]
  
  // Add model-specific prefix if needed
  const modelPrefixes = {
    'gpt-4': '',
    'gpt-3.5-turbo': '',
    'claude-3': 'I understand your request. ',
    'llama-2': 'Based on my analysis, ',
    'gemini-pro': 'Let me help you with that. '
  }
  
  const prefix = modelPrefixes[modelId] || ''
  return prefix + response
}

// Simulate streaming response (for future implementation)
export const streamResponse = async (text, onChunk) => {
  const words = text.split(' ')
  let accumulated = ''
  
  for (let i = 0; i < words.length; i++) {
    accumulated += (i === 0 ? '' : ' ') + words[i]
    onChunk(accumulated)
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100))
  }
  
  return accumulated
}

// Generate title from first message
export const generateTitle = (message) => {
  const maxLength = 30
  let title = message.trim()
  
  if (title.length > maxLength) {
    title = title.substring(0, maxLength) + '...'
  }
  
  return title || 'New Chat'
}

// Format code blocks in response
export const formatCodeBlocks = (text) => {
  // Simple regex to detect code blocks
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  
  return text.replace(codeBlockRegex, (match, language, code) => {
    return `\`\`\`${language || ''}\n${code.trim()}\n\`\`\``
  })
}