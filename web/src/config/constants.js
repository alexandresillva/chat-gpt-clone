// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';
export const API_TIMEOUT = 30000; // 30 segundos

// UI Constants
export const INITIAL_MESSAGE = {
  user: "gpt",
  message: "Como posso te ajudar hoje?"
};

export const ERROR_MESSAGES = {
  GENERIC: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
  NETWORK: 'Erro de conexão. Verifique sua internet e tente novamente.',
  TIMEOUT: 'A requisição demorou muito. Tente novamente.',
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  CONVERSATIONS: 'chatgpt-conversations'
};

// Delays
export const COPY_FEEDBACK_DELAY = 2000;
