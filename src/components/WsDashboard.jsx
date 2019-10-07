import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listDocumentItems } from "../graphql/queries";
import WsEntry from "./WsEntry";
import { deleteWsFile } from "../actions/fetchFunctions";

function WsDashboard() {
  const [files, setFiles] = useState([]);

  const handleListWsFiles = async () => {
    // Use aplify api graphql method to request graphql queries
    // that we improt by name "listNotes"
    const { data } = await API.graphql(graphqlOperation(listDocumentItems));
    const { items } = data.listDocumentItems;
    // changle state variable
    setFiles(items);
  };

  const handleDeleteWSFile = (index, id) => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    deleteWsFile(id);
  };

  useEffect(() => {
    // On load of page run handleListNotes function
    handleListWsFiles();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg my-20">
        {files.map((doc, index) => (
          <WsEntry
            key={doc.id}
            index={index}
            id={doc.id}
            name={doc.name}
            handleDeleteWSFile={() => handleDeleteWSFile(index, doc.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default WsDashboard;
