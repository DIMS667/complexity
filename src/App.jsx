import { useState, useEffect } from 'react'
import './styles/globals.css'
import { ChatProvider } from './contexts/ChatContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/layout/Layout'
import ChatContainer from './components/chat/ChatContainer'
import WelcomeScreen from './components/chat/WelcomeScreen'
import { useChat } from './hooks/useChat'

function AppContent() {
  const { conversations, currentConversationId } = useChat()
  const hasActiveConversation = currentConversationId && conversations[currentConversationId]

  return (
    <Layout>
      {hasActiveConversation ? (
        <ChatContainer conversationId={currentConversationId} />
      ) : (
        <WelcomeScreen />
      )}
    </Layout>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </ThemeProvider>
  )
}

export default App