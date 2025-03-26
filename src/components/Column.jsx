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
  const handleDelete = (id)=>{
        setTasks(  tasks
          .filter((e,i)=>{
            return i !== id
          }) )
  }
 
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
    .map((task,id) => (
      <>
      <Task key={task.id} id={task.id} title={task.title} />
     
        <button  onClick={()=>{
            handleDelete(id)
      }}  type="button" class="text-white bg-red-800 h-10 w-10 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full dark:bg-red-800 dark:hover:bg-red-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-2">D</button>
          
      </>
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
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
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
