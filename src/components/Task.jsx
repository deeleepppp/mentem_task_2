import React from "react";
import { useDrag } from "react-dnd";

const Task = ({ id, title }) => {
  console.log(title);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  

  return (
    <div ref={drag} className={`p-2 mb-2 border rounded-lg shadow-sm cursor-pointer bg-blue-100 ${isDragging ? "opacity-50" : ""}`}>
      {title}
    
    </div>
  );
};

export default Task;
