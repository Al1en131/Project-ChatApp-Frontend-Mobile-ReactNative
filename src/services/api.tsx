import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ganti dengan URL server Anda

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data; // Mengembalikan token
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const sendMessage = async (sender_id: number, receiver_id: number, message: string) => {
  try {
    const response = await api.post('/chat/send', { sender_id, receiver_id, message });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMessages = async (user1_id: number, user2_id: number) => {
  try {
    const response = await api.get(`/chat/${user1_id}/${user2_id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
