import { useState } from "react";
import AddTaskInput from "./components/AddTaskInput";
import SectionColumn from "./components/SectionColumn";
import ProfileTab from "./pages/ProfileTab";
import Clock from "./components/Clock";
import type { Task } from "./types/types";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("home");
  const [newSection, setNewSection] = useState("");
  const [newTask, setNewTask] = useState("");

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        if (!task.completed) {
          return { ...task, completed: true, section: undefined };
        } else {
          return { ...task, completed: false, section: undefined };
        }
      }
      return task;
    }));
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      section: undefined
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addSection = () => {
    if (newSection.trim() !== "") {
      setSections([...sections, newSection.trim()]);
      setNewSection("");
    }
  };

  const deleteSection = (sectionName: string) => {
    setSections(sections.filter(s => s !== sectionName));
    setTasks(tasks.filter(task => task.section !== sectionName));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskId = Number(draggableId);
    const draggedTask = tasks.find(task => task.id === taskId);
    if (!draggedTask) return;

    const getTasksForSection = (sectionId: string) => {
      if (sectionId === "To Do") return tasks.filter(t => !t.completed && !t.section);
      if (sectionId === "Completed") return tasks.filter(t => t.completed);
      return tasks.filter(t => t.section === sectionId && !t.completed);
    };

    const sourceTasks = getTasksForSection(source.droppableId);
    const destinationTasks = getTasksForSection(destination.droppableId);

    sourceTasks.splice(source.index, 1);

    const updatedTask = {
      ...draggedTask,
      completed: destination.droppableId === "Completed",
      section:
        destination.droppableId !== "To Do" &&
        destination.droppableId !== "Completed"
          ? destination.droppableId
          : undefined,
    };

    destinationTasks.splice(destination.index, 0, updatedTask);

    const allOtherTasks = tasks.filter(
      t =>
        !sourceTasks.includes(t) &&
        !destinationTasks.includes(t) &&
        t.id !== taskId
    );

    const mergedTasks = [
      ...(
        destination.droppableId === source.droppableId
          ? destinationTasks
          : [...destinationTasks, ...sourceTasks]
      ),
      ...allOtherTasks
    ];

    setTasks(mergedTasks);
  };

  return (
    <div className="min-h-screen bg-[#3E2C23] text-[#FAE3C7] p-4 flex">
      {activeTab === "home" && (
        <div className="w-1/4 flex justify-center items-start pt-6">
          <Clock />
        </div>
      )}

      <div className={`${activeTab === "home" ? "w-3/4" : "w-full"} pl-4`}>
        <nav className="flex justify-end gap-4 mb-6">
          <button
            className={`p-2 px-4 rounded transition-colors duration-300 ${
              activeTab === "home"
                ? "bg-[#C97B43] text-white"
                : "bg-[#5C4033] text-[#FAE3C7]"
            }`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`p-2 px-4 rounded transition-colors duration-300 ${
              activeTab === "profile"
                ? "bg-[#C97B43] text-white"
                : "bg-[#5C4033] text-[#FAE3C7]"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </nav>

        {activeTab === "home" ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-6 w-full">
              <div className="flex flex-col gap-4 w-1/2">
                <div className="w-full">
                  <AddTaskInput
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onAdd={addTask}
                  />
                </div>

                <SectionColumn
                  title="Completed"
                  tasks={tasks.filter(task => task.completed)}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />

                <SectionColumn
                  title="To Do"
                  tasks={tasks.filter(task => !task.completed && !task.section)}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </div>

              <div className="flex flex-col gap-4 w-1/2">
                <div className="flex w-full mb-4">
                  <input
                    type="text"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    placeholder="Enter Section"
                    className="w-full p-2 rounded-l bg-[#5C4033] text-white border border-orange-500 focus:outline-none"
                  />
                  <button
                    onClick={addSection}
                    className="bg-orange-500 text-white px-4 rounded-r hover:bg-orange-600"
                  >
                    +
                  </button>
                </div>

                {sections.map((section, index) => (
                  <SectionColumn
                    key={index}
                    title={section}
                    tasks={tasks.filter(
                      task => task.section === section && !task.completed
                    )}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onDeleteSection={deleteSection} // only passed for user-created sections
                  />
                ))}
              </div>
            </div>
          </DragDropContext>
        ) : (
          <ProfileTab />
        )}
      </div>
    </div>
  );
}
