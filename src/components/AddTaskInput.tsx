import React from "react";

interface AddTaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

export default function AddTaskInput({ value, onChange, onAdd }: AddTaskInputProps) {
  return (
    <div className="flex w-[500px] mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter new task"
        className="flex-1 p-2 rounded-l bg-[#5C4033] text-white border border-orange-500 focus:outline-none"
      />
      <button
        onClick={onAdd}
        className="bg-orange-500 text-white px-4 rounded-r hover:bg-orange-600"
      >
        +
      </button>
    </div>
  );
}
