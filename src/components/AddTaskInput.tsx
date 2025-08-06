import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTaskInputProps {
  onAdd: (task: string) => void;
}

export default function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim()) {
      onAdd(task);
      setTask('');
    }
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        type="text"
        className="flex-grow p-2 border rounded"
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        <Plus />
      </button>
    </div>
  );
}
