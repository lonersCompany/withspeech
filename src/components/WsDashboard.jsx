import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listDocumentItems } from "../graphql/queries";
import WsEntry from "./WsEntry";
import { MediaPackage } from "aws-sdk";
import { deleteWsFile } from "../actions/fetchFunctions";

function WsDashboard() {
  const [documents, setDocuments] = useState([]);

  const handleListDocuments = async () => {
    // Use aplify api graphql method to request graphql queries
    // that we improt by name "listNotes"
    const { data } = await API.graphql(graphqlOperation(listDocumentItems));
    // changle state variable
    setDocuments(data.listDocumentItems.items);
  };

  const getDeleteDocument = (index, id) => {
    let newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);

    deleteWsFile(id);
  };

  useEffect(() => {
    // On load of page run handleListNotes function
    handleListDocuments();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg my-20">
        {documents.map((doc, index) => (
          <WsEntry
            key={doc.id}
            index={index}
            id={doc.id}
            name={doc.name}
            getDeleteDocument={() => getDeleteDocument(index, doc.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default WsDashboard;

// const handleDeleteDocument = async id => {
//   console.log(id);
//   const payload = { id };
//   const { data } = await API.graphql(
//     graphqlOperation(deleteDocumentItem, { input: payload })
//   );
//   handleListDocuments();
//   console.log(data);
// };
