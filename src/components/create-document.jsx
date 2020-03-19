import React, { useState } from "react";
import { createWsFile } from "../actions/fetchFunctions";
import { useHistory, Redirect } from "react-router-dom";

function CreateDocument() {
  const [path, setPath] = useState();
  const history = useHistory();

  const handleClick = async params => {
    console.log("NEW");
    const { id } = await createWsFile();
    setPath(`/doc/${id}`);
    history.push(`/doc/${id}`);
  };

  return (
    <div>
      {path ? <Redirect to={path} /> : null}
      <button
        type="button"
        onClick={handleClick}
        className="px-6 py-5 font-semibold text-xl text-left block w-full hover:bg-green-300"
      >
        + new document
      </button>
    </div>
  );
}

export default CreateDocument;
