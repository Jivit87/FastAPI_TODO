import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Tasks</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;