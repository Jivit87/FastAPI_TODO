import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  // GET all tasks
  getTasks: () => api.get('/tasks'),
  
  // GET single task
  getTask: (id) => api.get(`/tasks/${id}`),
  
  // POST new task
  createTask: (task) => api.post('/tasks', task),
  
  // PUT update task
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  
  // DELETE task
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;