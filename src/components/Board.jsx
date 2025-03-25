import React, { useState } from "react";
import Column from "./Column";

const Board = ({ tasks, setTasks }) => {
  const [statuses, setStatuses] = useState(["todo", "in-progress", "done"]);
  const [newStatus, setNewStatus] = useState("");

  const addColumn = () => {
    if (newStatus.trim() && !statuses.includes(newStatus)) {
      setStatuses([...statuses, newStatus.trim()]);
      setNewStatus("");
    }
  };



  return (
    <div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          placeholder="Enter column name"
          className="border p-2 rounded"
        />
        <button onClick={addColumn} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Column
        </button>
      </div>

      <div className="flex gap-4">
        {statuses.map((status) => (
          <div key={status} className="relative">
            <Column status={status} tasks={tasks} setTasks={setTasks} />
        
          </div>
        ))}
        
      </div>
      

    </div>
  );
};

export default Board;
