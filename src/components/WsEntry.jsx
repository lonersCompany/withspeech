import React from "react";
import { Link } from "react-router-dom";

const Entry = ({ id, name, index, handleDeleteWSFile }) => {
  return (
    <div className="flex border-b border-gray-200 hover:bg-gray-100">
      <Link to={`doc/${id}`} className="flex-1 block py-2">
        <h2>
          <span role="img" aria-label="document">
            📄
          </span>{" "}
          {name}
        </h2>
      </Link>

      <button
        onClick={() => handleDeleteWSFile(index)}
        className="hover:bg-gray-400 inline-block text-sm px-4 py-2 leading-none hover:border-transparent hover:text-teal-500 mt-4 lg:mt-0"
      >
        <span role="img" aria-label="delete">
          ✖️
        </span>
      </button>
    </div>
  );
};
export default Entry;
