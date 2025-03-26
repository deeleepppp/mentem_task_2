import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";

const App = () => {
  const savedData = () => {
    const data = localStorage.getItem("tasks");
    return data
      ? JSON.parse(data)
      : [
          { id: "1", title: "Setup Project", status: "todo", },
          { id: "2", title: "Design UI", status: "in-progress" },
          { id: "3", title: "Implement Login", status: "done" },
        ];
  };

  const [tasks, setTasks] = useState(savedData);
  const [newTasks, setNewTasks] = useState({ id: "", title: "" });

  const addTasks = () => {
    if (newTasks && !tasks.includes(newTasks)) {
      setTasks([...tasks, newTasks]);
      setNewTasks({ id: "", title: "" });
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-center">
          Trello Clone
        </h1>
        <Board tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default App;
