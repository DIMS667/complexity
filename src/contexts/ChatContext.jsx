// ============================================
// 3. src/contexts/ChatContext.jsx (MISE À JOUR COMPLÈTE)
// ============================================
import { createContext, useState, useContext, useEffect } from 'react';
import { generateId, getStoredData, setStoredData } from '../utils/storage';
import { generateAIResponse } from '../utils/messageGenerator';
import conversationsData from '../data/conversations.json';
import modelsData from '../data/models.json';
import { apiService } from '../services/apiService';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState({});
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
  const [isGenerating, setIsGenerating] = useState(false);
  const [models, setModels] = useState(modelsData);
  const [isApiMode, setIsApiMode] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking' | 'connected' | 'disconnected'

  // Vérifier la disponibilité de l'API au démarrage
  useEffect(() => {
    const checkApi = async () => {
      const available = await apiService.checkApiAvailability();
      setIsApiMode(available);
      setApiStatus(available ? 'connected' : 'disconnected');
      
      if (available) {
        console.log('✅', SUCCESS_MESSAGES.API_CONNECTED);
        await loadConversationsFromApi();
        await loadModelsFromApi();
      } else {
        console.warn('⚠️', ERROR_MESSAGES.API_UNAVAILABLE);
        loadConversationsFromLocalStorage();
      }
    };

    checkApi();
  }, []);

  // Charger les conversations depuis l'API
  const loadConversationsFromApi = async () => {
    try {
      const apiConversations = await apiService.fetchConversations();
      setConversations(apiConversations);
      
      if (Object.keys(apiConversations).length > 0) {
        const firstId = Object.keys(apiConversations)[0];
        setCurrentConversationId(firstId);
      }
    } catch (error) {
      console.error('Erreur chargement API:', error);
      loadConversationsFromLocalStorage();
    }
  };

  // Charger les modèles depuis l'API
  const loadModelsFromApi = async () => {
    try {
      const apiModels = await apiService.fetchModels();
      
      // Fusionner avec les modèles locaux
      const mergedModels = apiModels.map(apiModel => {
        const localModel = modelsData.find(m => m.id === apiModel.id);
        return localModel ? { ...localModel, ...apiModel } : apiModel;
      });
      
      setModels(mergedModels.length > 0 ? mergedModels : modelsData);
    } catch (error) {
      console.error('Erreur chargement modèles:', error);
      setModels(modelsData);
    }
  };

  // Charger les conversations depuis localStorage
  const loadConversationsFromLocalStorage = () => {
    const stored = getStoredData('conversations');
    if (stored && Object.keys(stored).length > 0) {
      setConversations(stored);
      const lastConvId = getStoredData('lastConversationId');
      if (lastConvId && stored[lastConvId]) {
        setCurrentConversationId(lastConvId);
      }
    } else {
      setConversations(conversationsData);
      const firstId = Object.keys(conversationsData)[0];
      if (firstId) setCurrentConversationId(firstId);
    }
  };

  // Sauvegarder dans localStorage (mode simulation uniquement)
  useEffect(() => {
    if (!isApiMode && Object.keys(conversations).length > 0) {
      setStoredData('conversations', conversations);
    }
    if (!isApiMode && currentConversationId) {
      setStoredData('lastConversationId', currentConversationId);
    }
  }, [conversations, currentConversationId, isApiMode]);

  const createNewConversation = async (title = 'Nouveau Chat') => {
    if (isApiMode) {
      try {
        const newConv = await apiService.createConversation(title, selectedModel);
        setConversations(prev => ({
          ...prev,
          [newConv.id]: newConv,
        }));
        setCurrentConversationId(newConv.id);
        return newConv.id;
      } catch (error) {
        console.error('Erreur création conversation:', error);
        return null;
      }
    } else {
      // Mode simulation
      const id = generateId();
      const newConversation = {
        id,
        title,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        model: selectedModel,
      };

      setConversations(prev => ({
        ...prev,
        [id]: newConversation,
      }));
      setCurrentConversationId(id);
      return id;
    }
  };

  const deleteConversation = async (id) => {
    if (isApiMode) {
      try {
        await apiService.deleteConversation(id);
        setConversations(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });

        if (currentConversationId === id) {
          const remainingIds = Object.keys(conversations).filter(convId => convId !== id);
          setCurrentConversationId(remainingIds[0] || null);
        }
      } catch (error) {
        console.error('Erreur suppression conversation:', error);
      }
    } else {
      // Mode simulation
      setConversations(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });

      if (currentConversationId === id) {
        const remainingIds = Object.keys(conversations).filter(convId => convId !== id);
        setCurrentConversationId(remainingIds[0] || null);
      }
    }
  };

  const renameConversation = async (id, newTitle) => {
    if (isApiMode) {
      try {
        await apiService.updateConversation(id, { title: newTitle });
        setConversations(prev => ({
          ...prev,
          [id]: {
            ...prev[id],
            title: newTitle,
            updatedAt: new Date().toISOString(),
          },
        }));
      } catch (error) {
        console.error('Erreur renommage conversation:', error);
      }
    } else {
      // Mode simulation
      setConversations(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          title: newTitle,
          updatedAt: new Date().toISOString(),
        },
      }));
    }
  };

  const sendMessage = async (content) => {
    if (!currentConversationId || !content.trim() || isGenerating) return;

    setIsGenerating(true);

    // 🔍 AJOUT DE CES LOGS
    console.log('🚀 sendMessage - Mode API:', isApiMode);
    console.log('🚀 Conversation ID:', currentConversationId);
    console.log('🚀 Message:', content);

    if (isApiMode) {
      console.log('✅ Appel API Django...');
      try {
        const result = await apiService.sendMessage(currentConversationId, content);
        console.log('✅ Réponse API:', result);
        
        setConversations(prev => ({
          ...prev,
          [currentConversationId]: {
            ...prev[currentConversationId],
            messages: [
              ...prev[currentConversationId].messages,
              result.userMessage,
              result.assistantMessage,
            ],
            updatedAt: new Date().toISOString(),
          },
        }));
      } catch (error) {
        console.error('❌ Erreur API:', error);
      }
    } else {
      console.log('⚠️ Mode simulation...');
      // Mode simulation
      const userMessage = {
        id: generateId(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      setConversations(prev => ({
        ...prev,
        [currentConversationId]: {
          ...prev[currentConversationId],
          messages: [...prev[currentConversationId].messages, userMessage],
          updatedAt: new Date().toISOString(),
        },
      }));

      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const aiResponse = {
        id: generateId(),
        role: 'assistant',
        content: generateAIResponse(content, selectedModel),
        timestamp: new Date().toISOString(),
        model: selectedModel,
      };

      setConversations(prev => ({
        ...prev,
        [currentConversationId]: {
          ...prev[currentConversationId],
          messages: [...prev[currentConversationId].messages, aiResponse],
          updatedAt: new Date().toISOString(),
        },
      }));
    }

    setIsGenerating(false);
  };

  const editMessage = (conversationId, messageId, newContent) => {
    setConversations(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        messages: prev[conversationId].messages.map(msg =>
          msg.id === messageId ? { ...msg, content: newContent, edited: true } : msg
        ),
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const regenerateMessage = async (conversationId, messageId) => {
    const conversation = conversations[conversationId];
    if (!conversation) return;

    const messageIndex = conversation.messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    let previousUserMessage = '';
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (conversation.messages[i].role === 'user') {
        previousUserMessage = conversation.messages[i].content;
        break;
      }
    }

    if (!previousUserMessage) return;

    setIsGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const newContent = generateAIResponse(previousUserMessage, selectedModel);

    setConversations(prev => ({
      ...prev,
      [conversationId]: {
        ...prev[conversationId],
        messages: prev[conversationId].messages.map(msg =>
          msg.id === messageId
            ? { ...msg, content: newContent, regenerated: true, timestamp: new Date().toISOString() }
            : msg
        ),
        updatedAt: new Date().toISOString(),
      },
    }));

    setIsGenerating(false);
  };

  const clearConversation = (id) => {
    setConversations(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        messages: [],
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const value = {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    selectedModel,
    setSelectedModel,
    models,
    isGenerating,
    isApiMode,
    apiStatus,
    createNewConversation,
    deleteConversation,
    renameConversation,
    sendMessage,
    editMessage,
    regenerateMessage,
    clearConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};