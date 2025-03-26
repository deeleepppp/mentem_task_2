import React, { useEffect, useState } from "react";
import Column from "./Column";

const Board = ({ tasks, setTasks }) => {

  const savedStatus = () => {
    const saveStatus = localStorage.getItem("statuses");
    return saveStatus ? JSON.parse(saveStatus) : ["todo", "in-progress", "done"];
  };

  const [statuses, setStatuses] = useState(savedStatus);
  const [newStatus, setNewStatus] = useState("");

  const addColumn = () => {
    if (newStatus.trim() && !statuses.includes(newStatus)) {
      setStatuses([...statuses, newStatus.trim()]);
      setNewStatus("");
    }
  };

  const handleDelete = (id) => {
    setStatuses(statuses.filter((_, i) => i !== id));
  };

  useEffect(() => {
    localStorage.setItem("statuses", JSON.stringify(statuses));
  }, [statuses]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          placeholder="Enter column name"
          className="border p-2 rounded w-full sm:w-auto"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addColumn();
            }
          }}
        />
        <button
          onClick={addColumn}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Add Column
        </button>
      </div>
      
       <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {statuses.map((status, id) => (
          <div key={status} className="relative w-full sm:w-auto">
            <button
              onClick={() => handleDelete(id)}
              className="rounded-full absolute right-2 top-1 h-6 w-6 text-sm bg-black text-white"
            >
              X
            </button>
            <Column status={status} tasks={tasks} setTasks={setTasks} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Board;
