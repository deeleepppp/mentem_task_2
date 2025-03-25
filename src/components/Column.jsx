import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";

const Column = ({ status, tasks, setTasks }) => {
  const [form, setForm] = useState({ id: "", title: "", status: status });
  const [isOpen, setIsOpen] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return; 

    const newTask = {
      ...form,
   
    };

    setTasks((prev) => [...prev, newTask]);
    setForm({ id: "", title: "", status: status })
    setIsOpen(false); 
  }

  return (
    <div
      ref={drop}
      className={`w-64 p-4 border rounded-lg shadow-md bg-white ${
        isOver ? "bg-gray-200" : ""
      }`}
    >
      <h2 className="text-lg font-bold mb-2 capitalize">{status}</h2>

      
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
        
         <Task key={task.id} id={task.id} title={task.title} />

        ))}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
      >
        {isOpen ? "Cancel" : "Add Card"}
      </button>
      {isOpen && (
        <form onSubmit={handleSubmit} className="mb-2">
          <input
            type="text"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="border p-1 w-full mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
            Add
          </button>
        </form>
      )}

    </div>
  );
};

export default Column;
