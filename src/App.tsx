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

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // Find the dragged task
    const draggedTask = tasks[source.index];
    if (!draggedTask) return;

    // If moving to a different section
    const updatedTasks = [...tasks];

    updatedTasks[source.index] = {
      ...draggedTask,
      completed: destination.droppableId === "Completed",
      section: destination.droppableId !== "To Do" && destination.droppableId !== "Completed"
        ? destination.droppableId
        : undefined,
    };

    setTasks(updatedTasks);
  };


  return (
    <div className="min-h-screen bg-[#3E2C23] text-[#FAE3C7] p-4 flex">
      {/* LEFT CLOCK PANEL */}
      <div className="w-1/4 flex justify-center items-start pt-6">
        <Clock />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-3/4 pl-4">
        {/* NAV BUTTONS */}
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
          <>
            {/* Inputs for Task and Section */}
            <div className="flex gap-6">
              {/* Add Task */}
              <div className="flex w-full max-w-2xl">
                <AddTaskInput onAdd={addTask} />
              </div>
              {/* Add Section */}
              <div className="flex w-[500px] mb-4">
                <input
                  type="text"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  placeholder="Enter Section"
                  className="w-[500px] p-2 rounded-l bg-[#5C4033] text-white border border-orange-500 focus:outline-none"
                />
                <button
                  onClick={addSection}
                  className="bg-orange-500 text-white px-4 rounded-r hover:bg-orange-600"
                >
                  +
                </button>
              </div>
            </div>


            {/* Drag & Drop Context */}
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex flex-col gap-4 mt-6 w-full max-w-3xl">
                <SectionColumn
                  title="To Do"
                  tasks={tasks.filter((task) => !task.completed && !task.section)}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
                <SectionColumn
                  title="Completed"
                  tasks={tasks.filter((task) => task.completed)}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
                {sections.map((section, index) => (
                  <SectionColumn
                    key={index}
                    title={section}
                    tasks={tasks.filter((task) => task.section === section)}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}

              </div>
            </DragDropContext>
          </>
        ) : (
          <ProfileTab />
        )}
      </div>
    </div>
  );
}
