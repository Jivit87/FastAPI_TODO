import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskAPI } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, updateData) => {
    try {
      const response = await taskAPI.updateTask(taskId, updateData);
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Task Manager
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <TaskForm onSubmit={handleCreateTask} />
          <TaskList 
            tasks={tasks} 
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;