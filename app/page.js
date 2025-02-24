"use client";
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi"; // Importing three-dot menu icon

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setMaintask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      let updatedTasks = [...mainTask];
      updatedTasks[editIndex] = { title, desc };
      setMaintask(updatedTasks);
      setEditIndex(null);
    } else {
      setMaintask([...mainTask, { title, desc }]);
    }

    settitle("");
    setdesc("");
  };

  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMaintask(copytask);
    setMenuOpenIndex(null);
  };

  const editHandler = (i) => {
    settitle(mainTask[i].title);
    setdesc(mainTask[i].desc);
    setEditIndex(i);
    setMenuOpenIndex(null);
  };

  const toggleMenu = (i) => {
    setMenuOpenIndex(menuOpenIndex === i ? null : i);
  };

  const deleteAllHandler = () => {
    setMaintask([]);
  };

  let renderTask = <h2 className="text-center text-gray-500">No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between bg-white p-4 my-2 rounded-lg shadow-lg">
          <div className="flex flex-col w-2/3">
            <h5 className="text-xl font-semibold">{t.title}</h5>
            <h6 className="text-lg font-medium text-gray-600">{t.desc}</h6>
          </div>

          {/* Three-dot menu */}
          <div className="relative">
            <button
              onClick={() => toggleMenu(i)}
              className="text-2xl p-2 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              <FiMoreVertical />
            </button>

            {menuOpenIndex === i && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-md rounded-lg">
                <button
                  onClick={() => editHandler(i)}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(i)}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">Todo List</h1>
     
  


     <img src="/image.png" alt="Centered Image" className="flex items-center justify-center"/>
      <form onSubmit={submitHandler} className="flex flex-col items-center space-y-4 mt-6">
        <input
          type="text"
          className="text-2xl border-gray-800 border-4 px-4 py-3 rounded-lg w-1/2"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        <input
          type="text"
          className="text-2xl border-gray-800 border-4 px-4 py-3 rounded-lg w-1/2"
          placeholder="Enter Description here"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-2xl font-bold rounded-lg transition-all">
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      <hr className="my-6" />

      <div className="p-8 bg-slate-200 rounded-lg shadow-lg w-3/4 mx-auto">
        <ul>{renderTask}</ul>

        {mainTask.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={deleteAllHandler}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg font-bold rounded-lg transition-all"
            >
              Delete All
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
