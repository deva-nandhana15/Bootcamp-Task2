import { useState } from "react";

interface Props {
  onAdd: (sectionTitle: string) => void;
}

export default function AddSectionInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <div className="flex items-center">
      <input
        className="p-2 rounded-l bg-[#FAE3C7] text-black w-48"
        placeholder="New section name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-[#C97B43] text-white px-4 py-2 rounded-r"
        onClick={handleAdd}
      >
        Add Section
      </button>
    </div>
  );
}
