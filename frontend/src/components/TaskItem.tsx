import { Trash2, Check } from 'lucide-react'; 

interface TaskItemProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, completed, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span className={`flex-1 ${completed ? 'line-through text-gray-400' : ''}`}>
        {task}
      </span>
      <div className="flex gap-2">
        <button onClick={onToggle} className="text-green-500 hover:text-green-700">
          <Check />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
