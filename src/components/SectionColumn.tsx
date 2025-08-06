import TaskItem from './TaskItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface SectionColumnProps {
  title: string;
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function SectionColumn({ title, tasks, onToggle, onDelete }: SectionColumnProps) {
  return (
    <div className="w-full sm:w-1/3 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {tasks.length === 0 && <p className="text-sm text-gray-400">No tasks yet.</p>}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task.text}
          completed={task.completed}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
}
