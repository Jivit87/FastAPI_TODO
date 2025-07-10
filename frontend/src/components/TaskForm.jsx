import { useState } from 'react';

const TaskForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      if (!initialData) {
        setFormData({ title: '', description: '' });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task description"
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
      >
        {initialData ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;