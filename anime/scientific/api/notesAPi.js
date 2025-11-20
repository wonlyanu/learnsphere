// client/src/api/notesApi.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const api = axios.create({ baseURL });

export const getNotes = () => api.get('/api/notes');
export const getNote = (id) => api.get(`/api/notes/${id}`);
export const createNote = (note) => api.post('/api/notes', note);
export const updateNote = (id, note) => api.put(`/api/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/api/notes/${id}`);
