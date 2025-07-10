import { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
  });

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(task.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ title: task.title, description: task.description });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 ${
      task.completed ? 'border-green-500' : 'border-blue-500'
    }`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleToggleComplete}
                className={`px-3 py-1 rounded-md text-sm transition duration-200 ${
                  task.completed
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
          {task.description && (
            <p className={`text-gray-600 mt-2 ${
              task.completed ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;