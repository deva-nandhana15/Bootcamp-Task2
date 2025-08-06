import { useState } from 'react';
import AddTaskInput from './components/AddTaskInput';
import SectionColumn from './components/SectionColumn';
import ProfileTab from './pages/ProfileTab';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState('home');

  const addTask = (text: string) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="flex justify-center gap-4 mb-6">
        <button
          className={`p-2 px-4 rounded ${activeTab === 'home' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={`p-2 px-4 rounded ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </nav>

      {activeTab === 'home' ? (
        <>
          <AddTaskInput onAdd={addTask} />
          <div className="flex flex-col sm:flex-row gap-4">
            <SectionColumn
              title="To Do"
              tasks={tasks.filter(task => !task.completed)}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
            <SectionColumn
              title="Completed"
              tasks={tasks.filter(task => task.completed)}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>
        </>
      ) : (
        <ProfileTab />
      )}
    </div>
  );
}

