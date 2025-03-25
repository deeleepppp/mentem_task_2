import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Setup Project", status: "todo" },
    { id: "2", title: "Design UI", status: "in-progress" },
    { id: "3", title: "Implement Login", status: "done" },
  ]);
   const [newTasks, setNewTasks] = useState({id:'',title:''});
   const addTasks = () => {
    if (newTasks && !tasks.includes(newTasks)) {
      setTasks([...tasks, newTasks]);
      setNewTasks({id:'',title:''});
    }
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-5">Trello Clone</h1>
        <Board tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default App;
