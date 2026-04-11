import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const careerApi = {
  generate: (careerName, duration) => client.post('/generate-career', { 
    career_name: careerName, 
    duration: duration 
  }),
  compare: (career1, career2) => client.post('/compare', { career1, career2 }),
};

export default client;
