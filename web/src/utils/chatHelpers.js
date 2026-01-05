import { makeRequest } from '../api/api';
import { ERROR_MESSAGES, INITIAL_MESSAGE } from '../config/constants';

/**
 * Envia mensagem para o GPT e retorna a resposta
 * @param {string} message - Mensagem do usuário
 * @returns {Promise<{success: boolean, data?: string, error?: string}>}
 */
export const sendMessageToGPT = async (message) => {
  try {
    const response = await makeRequest(message);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error sending message:', error);
    
    let errorMessage = ERROR_MESSAGES.GENERIC;
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = ERROR_MESSAGES.TIMEOUT;
    } else if (!error.response) {
      errorMessage = ERROR_MESSAGES.NETWORK;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Cria uma nova conversa com mensagem inicial
 * @returns {Object} Nova conversa
 */
export const createNewConversation = () => {
  const newConvId = Date.now();
  
  return {
    id: newConvId,
    title: 'Nova conversa',
    messages: [INITIAL_MESSAGE],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * Encontra a última mensagem do usuário no chat log
 * @param {Array} chatLog - Array de mensagens
 * @returns {string|null} Última mensagem do usuário ou null
 */
export const findLastUserMessage = (chatLog) => {
  for (let i = chatLog.length - 1; i >= 0; i--) {
    if (chatLog[i].user === 'me') {
      return chatLog[i].message;
    }
  }
  return null;
};

/**
 * Remove a última mensagem do GPT se existir
 * @param {Array} chatLog - Array de mensagens
 * @returns {Array} Chat log sem a última mensagem do GPT
 */
export const removeLastGPTMessage = (chatLog) => {
  return chatLog.filter((msg, idx) => 
    idx !== chatLog.length - 1 || msg.user !== 'gpt'
  );
};
