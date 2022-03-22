import axios from 'axios';

// TODO: setup env variables
export const axiosClient = axios.create({
  baseURL: 'http://localhost:3139',
});
