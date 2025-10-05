// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env?.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
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
  SIDEBAR_WIDTH: 288, // 72 * 4 (w-72)
  MAX_TITLE_LENGTH: 30,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 200,
};

// Storage Configuration
export const STORAGE_CONFIG = {
  MAX_CONVERSATIONS: 100,
  MAX_MESSAGES_PER_CONVERSATION: 1000,
  CACHE_DURATION: 3600000, // 1 hour
  AUTO_SAVE_DELAY: 1000,
};

// Model Configuration
export const MODEL_CONFIG = {
  DEFAULT_MODEL: 'gpt-4',
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
  NETWORK_ERROR: 'Network error. Please check your connection.',
  RATE_LIMIT: 'Too many requests. Please wait a moment.',
  INVALID_INPUT: 'Invalid input. Please check your message.',
  STORAGE_FULL: 'Storage is full. Please delete some conversations.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CONVERSATION_CREATED: 'New conversation created',
  CONVERSATION_DELETED: 'Conversation deleted',
  MESSAGE_COPIED: 'Message copied to clipboard',
  SETTINGS_SAVED: 'Settings saved successfully',
  EXPORT_COMPLETE: 'Export completed successfully',
};

/**
 * ✅ NEW: Keyboard shortcuts consumed by SettingsPanel
 * Shape: { [id]: { key: string, ctrlKey?: boolean, shiftKey?: boolean, description: string } }
 */
export const DEFAULT_SHORTCUTS = {
  newChat:        { key: 'n', ctrlKey: true,  shiftKey: true,  description: 'New conversation' },
  focusInput:     { key: '/', ctrlKey: false, shiftKey: false, description: 'Focus message box' },
  sendMessage:    { key: 'Enter', ctrlKey: false, shiftKey: false, description: 'Send message' },
  newLine:        { key: 'Enter', ctrlKey: false, shiftKey: true,  description: 'Insert line break' },
  toggleTheme:    { key: 'l', ctrlKey: true,  shiftKey: true,  description: 'Toggle Light/Dark' },
  openSettings:   { key: ',', ctrlKey: true,  shiftKey: false, description: 'Open settings' },
  quickSearch:    { key: 'k', ctrlKey: true,  shiftKey: false, description: 'Quick search' },
  nextConversation:{ key: ']', ctrlKey: true, shiftKey: false, description: 'Next conversation' },
  prevConversation:{ key: '[', ctrlKey: true, shiftKey: false, description: 'Previous conversation' },
};

/**
 * ✅ NEW: Defaults for UI settings so "Reset" works predictably
 */
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
