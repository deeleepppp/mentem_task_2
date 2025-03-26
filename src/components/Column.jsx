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

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTask = { ...form, id: Date.now().toString() }; 
    setTasks((prev) => [...prev, newTask]);
    setForm({ id: "", title: "", status: status });
    setIsOpen(false);
  };

  return (
    <div
      ref={drop}
      className={`w-64 p-4 border rounded-lg shadow-md bg-white ${
        isOver ? "bg-gray-200" : ""
      }`}
    >
      <h2 className="text-lg font-bold mb-2 capitalize">{status}</h2>

      {Array.isArray(tasks) &&
        tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              handleDelete={handleDelete}
            />
          ))}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        {isOpen ? "Cancel" : "Add Card"}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mb-2">
          <input
            type="text"
            placeholder="Task title"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border p-1 w-full mb-2"
            autoFocus
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
