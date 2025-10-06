export const API_CONFIG = {
  BASE_URL: import.meta.env?.VITE_API_URL || 'http://localhost:8000',
  DJANGO_API_URL: 'http://localhost:8000/api',
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
  USE_MOCK_DATA: false, // Sera détecté automatiquement
};

// Message Configuration
export const MESSAGE_CONFIG = {
  MAX_LENGTH: 10000,
  MIN_LENGTH: 1,
  TYPING_DELAY: 1000,
  AUTO_SCROLL_DELAY: 100,
};

// UI Configuration
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 288,
  MAX_TITLE_LENGTH: 30,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 200,
};

// Storage Configuration
export const STORAGE_CONFIG = {
  MAX_CONVERSATIONS: 100,
  MAX_MESSAGES_PER_CONVERSATION: 1000,
  CACHE_DURATION: 3600000,
  AUTO_SAVE_DELAY: 1000,
};

// Model Configuration
export const MODEL_CONFIG = {
  DEFAULT_MODEL: 'gemini-1.5-flash', 
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 2000,
  DEFAULT_TOP_P: 1,
  DEFAULT_FREQUENCY_PENALTY: 0,
  DEFAULT_PRESENCE_PENALTY: 0,
};


// Feature Flags
export const FEATURES = {
  VOICE_INPUT: false,
  FILE_UPLOAD: true,
  CODE_EXECUTION: false,
  EXPORT_PDF: true,
  SHARE_CONVERSATION: false,
  PLUGINS: false,
  MULTI_LANGUAGE: true,
};

// Supported Languages
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

// Export Formats
export const EXPORT_FORMATS = [
  { id: 'json', name: 'JSON', extension: '.json', mime: 'application/json' },
  { id: 'md', name: 'Markdown', extension: '.md', mime: 'text/markdown' },
  { id: 'txt', name: 'Plain Text', extension: '.txt', mime: 'text/plain' },
  { id: 'pdf', name: 'PDF', extension: '.pdf', mime: 'application/pdf' },
];

// Theme Configuration
export const THEMES = {
  light: { name: 'Light', class: '', icon: 'sun' },
  dark: { name: 'Dark', class: 'dark', icon: 'moon' },
  auto: { name: 'System', class: 'auto', icon: 'monitor' },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur réseau. Vérifiez votre connexion.',
  RATE_LIMIT: 'Trop de requêtes. Veuillez patienter.',
  INVALID_INPUT: 'Entrée invalide. Vérifiez votre message.',
  STORAGE_FULL: 'Stockage plein. Supprimez des conversations.',
  GENERIC_ERROR: 'Une erreur s\'est produite. Réessayez.',
  API_UNAVAILABLE: 'API indisponible. Mode simulation activé.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CONVERSATION_CREATED: 'Nouvelle conversation créée',
  CONVERSATION_DELETED: 'Conversation supprimée',
  MESSAGE_COPIED: 'Message copié',
  SETTINGS_SAVED: 'Paramètres sauvegardés',
  EXPORT_COMPLETE: 'Export terminé',
  API_CONNECTED: 'Connecté à l\'API Django',
};

export const DEFAULT_SHORTCUTS = {
  newChat: { key: 'n', ctrlKey: true, shiftKey: true, description: 'New conversation' },
  focusInput: { key: '/', ctrlKey: false, shiftKey: false, description: 'Focus message box' },
  sendMessage: { key: 'Enter', ctrlKey: false, shiftKey: false, description: 'Send message' },
  newLine: { key: 'Enter', ctrlKey: false, shiftKey: true, description: 'Insert line break' },
  toggleTheme: { key: 'l', ctrlKey: true, shiftKey: true, description: 'Toggle Light/Dark' },
  openSettings: { key: ',', ctrlKey: true, shiftKey: false, description: 'Open settings' },
  quickSearch: { key: 'k', ctrlKey: true, shiftKey: false, description: 'Quick search' },
  nextConversation: { key: ']', ctrlKey: true, shiftKey: false, description: 'Next conversation' },
  prevConversation: { key: '[', ctrlKey: true, shiftKey: false, description: 'Previous conversation' },
};

export const DEFAULT_SETTINGS = {
  language: 'en',
  fontSize: 'medium',
  autoSave: true,
  notifications: true,
  soundEffects: false,
  enterToSend: true,
  showTimestamps: true,
  compactMode: false,
  temperature: 0.7,
  maxTokens: 2000,
  streamResponse: true,
};