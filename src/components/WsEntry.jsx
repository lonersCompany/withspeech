import React from "react";
import { Link } from "react-router-dom";

const Entry = ({ id, name, index, handleDeleteWSFile }) => {
  return (
    <div className="flex border-b ">
      <Link
        to={`doc/${id}`}
        className="flex-1 w-full py-5 px-6 hover:bg-green-500"
      >
        <h2>
          <span role="img" aria-label="document">
            📄
          </span>{" "}
          {name}
        </h2>
      </Link>

      <button
        onClick={() => handleDeleteWSFile(index)}
        className="bg-gray-800 hover:bg-gray-600 inline-block text-sm px-4 py-2"
      >
        <span role="img" aria-label="delete">
          ✖️
        </span>
      </button>
    </div>
  );
};
export default Entry;
