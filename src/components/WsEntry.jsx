import React from "react";
import { Link } from "react-router-dom";

const Entry = props => {
  return (
    <div className="flex border-b border-gray-200 hover:bg-gray-100">
      <Link to={`doc/${props.id}`} className="flex-1 block py-2">
        <h2>
          <span role="img" aria-label="document">
            📄
          </span>{" "}
          {props.name}
        </h2>
      </Link>

      <button
        onClick={() => props.getDeleteDocument(props.index)}
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
