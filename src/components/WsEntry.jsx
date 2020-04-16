import React from "react";
import { Link } from "react-router-dom";

const WsEntry = ({ id, name }) => {
  return (
    <div className="flex border-b-4 border-gray-800 text-2xl">
      <Link
        to={`doc/${id}`}
        className="flex-1 w-full py-5 px-6 hover:bg-green-400"
      >
        <h2 className="">
          <span role="img" aria-label="" aria-label="document">
            📄
          </span>{" "}
          {name}
        </h2>
      </Link>

      {/* <button
        onClick={() => handleDeleteWSFile(index)}
        className="bg-gray-700 hover:bg-gray-600 inline-block text-sm px-4 py-2"
      >
        <span role="img" aria-label="delete" className="text-2xl">
          ✖️
        </span>
      </button> */}
    </div>
  );
};
export default WsEntry;
