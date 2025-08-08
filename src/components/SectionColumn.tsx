import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { Task } from "../types/types";

interface SectionColumnProps {
  title: string;
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function SectionColumn({
  title,
  tasks,
  onToggle,
  onDelete,
}: SectionColumnProps) {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-[#5C4033] p-3 rounded w-[500px] min-h-[200px]"
        >
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          {tasks.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-[#FAE3C7] text-black p-2 rounded mb-2 flex justify-between items-center"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="mr-2 accent-green-600 cursor-pointer"
                  />
                  <span
                    className={`flex-1 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="ml-2 text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
