import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../config/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

export const makeRequest = async (message) => {
  try {
    const { data } = await apiClient.post('/api/prompt', { prompt: message });
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}
