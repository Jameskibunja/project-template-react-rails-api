import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Update with your API endpoint
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.defaults.headers.common['Authorization'] = `Bearer [put the token here]`;

export default api;
