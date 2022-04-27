import axios from 'axios';

// TODO: setup env variables
export const axiosClient = axios.create({
  baseURL: (import.meta.env.API_BASE_URL as string) || 'http://localhost:3139',
});
