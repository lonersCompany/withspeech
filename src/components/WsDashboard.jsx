import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listDocumentItems } from "../graphql/queries";
import WsEntry from "./WsEntry";
import { deleteWsFile } from "../actions/fetchFunctions";
import { Link } from "react-router-dom";
import Nav from "./nav";
import CreateDocument from "./create-document";

function WsDashboard() {
  const [files, setFiles] = useState([]);

  const handleListWsFiles = async () => {
    // Use aplify api graphql method to request graphql queries
    // that we improt by name "listNotes"
    const { data } = await API.graphql(graphqlOperation(listDocumentItems));
    const { items } = data.listDocumentItems;
    // changle state variable
    console.log(items);
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
    <div className="lg:flex">
      <div className="bg-gray-800 hidden fixed inset-0 pt-16 h-full z-90 w-full border-b -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5">
        <Nav>
          <Link to="/">
            <button className="px-6 py-5 w-full text-left font-semibold text-xl tracking-tight hover:bg-green-300">
              <span role="img" description="wave hand">
                👋
              </span>{" "}
              Wave Page
            </button>
          </Link>
          <CreateDocument />
        </Nav>
      </div>

      <div className="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
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
