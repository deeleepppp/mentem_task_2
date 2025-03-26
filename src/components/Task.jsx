import React from "react";
import { useDrag } from "react-dnd";

const Task = ({ id, title, handleDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  return (
    <div ref={drag} className=" flex item-center mb-2 justify-between h-fit w-full bg-gray-400 px-1 py-2 rounded-lg">
      <input type="radio" className="h-4 w-4"/>
      <h3 className="font-bold font-gilroy">{title}</h3>
      <button onClick={() => handleDelete(id)} className="bg-red-600 text-sm text-white rounded-full h-6 w-6 ">
        X
      </button>
    </div>
  );
};

export default Task;
