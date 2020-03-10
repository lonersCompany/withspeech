import React, { useState } from "react";
import { createWsFile } from "../actions/fetchFunctions";
import { Redirect } from "react-router-dom";

const CreateDocument = () => {
  const [documentUrl, setdocumentUrl] = useState();

  const handleCreateWsFile = async () => {
    // TODO: Create new doc function

    const { id } = await createWsFile();

    setdocumentUrl(`/doc/${id}`);
  };

  if (documentUrl) {
    return <Redirect to={documentUrl} />;
  }

  return (
    <button
      onClick={handleCreateWsFile}
      className="bg-white hover:bg-gray-200 py-2 px-4 rounded-full border border-black"
    >
      + New document
    </button>
  );
};

export default CreateDocument;
