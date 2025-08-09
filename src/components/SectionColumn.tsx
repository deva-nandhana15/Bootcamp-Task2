import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { Task } from "../types/types";

interface SectionColumnProps {
  title: string;
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onDeleteSection?: (title: string) => void; // Optional for user-created sections
}

export default function SectionColumn({
  title,
  tasks,
  onToggle,
  onDelete,
  onDeleteSection,
}: SectionColumnProps) {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-[#5C4033] p-3 rounded w-[500px] min-h-[200px]"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            {onDeleteSection && (
              <button
                onClick={() => onDeleteSection(title)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>

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
                  {/* Green Tick */}
                  <svg
                    onClick={() => onToggle(task.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 mr-2 cursor-pointer transition-transform ${
                      task.completed ? "text-green-600" : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>

                  {/* Task Text */}
                  <span
                    className={`flex-1 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>

                  {/* Delete Task Button */}
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
