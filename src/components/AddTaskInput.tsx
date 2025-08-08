import { useState } from "react";

interface AddTaskInputProps {
  onAdd: (text: string) => void;
}

export default function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() !== "") {
      onAdd(text);
      setText("");
    }
  };

  return (
    <div className="flex w-[500px] mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter new task"
        className="flex-1 p-2 rounded-l bg-[#5C4033] text-white border border-orange-500 focus:outline-none"
      />
      <button
        onClick={handleAdd}
        className="bg-orange-500 text-white px-4 rounded-r hover:bg-orange-600"
      >
        +
      </button>
    </div>
  );
}
