import React, { useState } from "react";
import { createWsFile } from "../actions/fetchFunctions";
import { Redirect } from "react-router-dom";
import { placeHolderValue } from "../slate/initials.js";

const CreateDocument = () => {
  const [documentUrl, setdocumentUrl] = useState();

  const handleCreateWsFile = async () => {
    // TODO: Create new doc function
    const payload = placeHolderValue;
    const { id } = await createWsFile(payload);

    setdocumentUrl(`/doc/${id}`);
  };

  if (documentUrl) {
    return <Redirect to={documentUrl} />;
  }

  return (
    <button
      onClick={handleCreateWsFile}
      className="inline-block text-sm px-4 py-2 leading-none border hover:border-teal-800 hover:text-teal-800 hover:bg-white mt-4 lg:mt-0"
    >
      + New document
    </button>
  );
};

export default CreateDocument;
