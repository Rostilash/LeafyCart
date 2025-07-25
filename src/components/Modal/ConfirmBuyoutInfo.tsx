import React, { useState, useEffect } from "react";

export const ConfirmBuyoutInfo = () => {
  const [notes, setNotes] = useState<string[]>(() => {
    const stored = localStorage.getItem("notes");
    return stored ? JSON.parse(stored) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    setNotes((prev) => [inputValue.trim(), ...prev]);
    setInputValue("");
  };

  const deleteNote = (note: string) => {
    setNotes((prev) => prev.filter((n) => n !== note));
  };

  const notesList = notes.map((note) => (
    <li key={note} className="flex justify-between items-center ">
      {note}
      <button onClick={() => deleteNote(note)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
        Delete
      </button>
    </li>
  ));

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your note"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />
        <button type="submit" className="px-3 py-2 ml-4 rounded-xl font-bold bg-green-600 hover:bg-green-900 text-white">
          Надіслати
        </button>
      </form>
      <ul className="space-y-1">{notesList}</ul>
    </div>
  );
};
