import React from "react";
import { Link } from "react-router-dom";

const WsEntry = ({ id, name, index, handleDeleteWSFile }) => {
  const setname = name ? name : "Untitle";
  return (
    <div className="flex border-b-4 border-gray-800 ">
      <Link
        to={`doc/${id}`}
        className="flex-1 w-full py-5 px-6 hover:bg-green-500"
      >
        <h2 className="text-2xl">
          <span role="img" aria-label="document">
            📄
          </span>{" "}
          {setname}
        </h2>
      </Link>

      <button
        onClick={() => handleDeleteWSFile(index)}
        className="bg-gray-700 hover:bg-gray-600 inline-block text-sm px-4 py-2"
      >
        <span role="img" aria-label="delete">
          ✖️
        </span>
      </button>
    </div>
  );
};
export default WsEntry;
