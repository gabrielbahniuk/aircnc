import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_API_URL
});

export default api;
