import React from "react";

const Task = ({ id, title, handleDelete }) => {
  return (
    <div className=" flex item-center mb-2 justify-between h-fit w-full bg-gray-200 px-1 py-2 rounded-lg">
      <h3 className="font-semibold font-gilroy">{title}</h3>
      <button onClick={() => handleDelete(id)} className="bg-red-600 text-sm text-white rounded-full h-6 w-6 ">
        X
      </button>
    </div>
  );
};

export default Task;
