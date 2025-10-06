// ============================================
// 2. src/services/apiService.js (NOUVEAU)
// ============================================
import { API_CONFIG } from '../utils/constants';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.DJANGO_API_URL;
    this.isApiAvailable = null;
    this.checkingApi = false;
  }

  async checkApiAvailability() {
    if (this.checkingApi) return this.isApiAvailable;
    
    this.checkingApi = true;
    try {
      const response = await fetch(`${this.baseURL}/conversations/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });
      this.isApiAvailable = response.ok;
    } catch (error) {
      console.warn('API Django non disponible, mode simulation activé');
      this.isApiAvailable = false;
    } finally {
      this.checkingApi = false;
    }
    return this.isApiAvailable;
  }

  async fetchConversations() {
    try {
      const response = await fetch(`${this.baseURL}/conversations/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error('Failed to fetch conversations');
      
      const data = await response.json();
      
      // Transformer les données Django en format frontend
      const conversations = {};
      data.forEach(conv => {
        conversations[conv.id] = {
          id: conv.id.toString(),
          title: conv.title,
          messages: conv.messages || [],
          createdAt: conv.created_at,
          updatedAt: conv.updated_at,
          model: conv.model_name,
        };
      });
      
      return conversations;
    } catch (error) {
      console.error('Erreur fetchConversations:', error);
      throw error;
    }
  }

  async createConversation(title = 'Nouvelle conversation', modelName = 'gemini-pro') {
    try {
      const response = await fetch(`${this.baseURL}/conversations/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, model_name: modelName }),
      });
      
      if (!response.ok) throw new Error('Failed to create conversation');
      
      const data = await response.json();
      
      return {
        id: data.id.toString(),
        title: data.title,
        messages: [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        model: data.model_name,
      };
    } catch (error) {
      console.error('Erreur createConversation:', error);
      throw error;
    }
  }

  async deleteConversation(id) {
    try {
      const response = await fetch(`${this.baseURL}/conversations/${id}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error('Failed to delete conversation');
      return true;
    } catch (error) {
      console.error('Erreur deleteConversation:', error);
      throw error;
    }
  }

  async updateConversation(id, updates) {
    try {
      const response = await fetch(`${this.baseURL}/conversations/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Failed to update conversation');
      
      const data = await response.json();
      return {
        id: data.id.toString(),
        title: data.title,
        messages: data.messages || [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        model: data.model_name,
      };
    } catch (error) {
      console.error('Erreur updateConversation:', error);
      throw error;
    }
  }

  async sendMessage(conversationId, message) {
    try {
      console.log('📤 API sendMessage:', { conversationId, message });
      
      const response = await fetch(`${this.baseURL}/conversations/${conversationId}/send_message/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      
      console.log('📥 API Response status:', response.status);
      
      if (!response.ok) throw new Error('Failed to send message');
      
      const data = await response.json();
      console.log('📥 API Response data:', data);
      
      return {
        userMessage: {
          id: data.user_message.id.toString(),
          role: data.user_message.role,
          content: data.user_message.content,
          timestamp: data.user_message.timestamp,
        },
        assistantMessage: {
          id: data.assistant_message.id.toString(),
          role: data.assistant_message.role,
          content: data.assistant_message.content,
          timestamp: data.assistant_message.timestamp,
        },
      };
    } catch (error) {
      console.error('❌ Erreur sendMessage:', error);
      throw error;
    }
  }

  async fetchModels() {
    try {
      const response = await fetch(`${this.baseURL}/conversations/models/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error('Failed to fetch models');
      
      return await response.json();
    } catch (error) {
      console.error('Erreur fetchModels:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();