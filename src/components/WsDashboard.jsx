import React, { useState, useEffect } from "react";
import WsEntry from "./WsEntry";
import { deleteWsFile, handleListWsFiles } from "../actions/fetchFunctions";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

function WsDashboard() {
  const [files, setFiles] = useState(false);

  const handleDeleteWSFile = (index, id) => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    deleteWsFile(id);
  };

  useEffect(() => {
    // On load of page run handleListNotes function

    const handleConfirm = () => {
      const responseConfirm = Auth.currentCredentials();
      responseConfirm
        .then((msg) => console.log(msg))
        .catch((err) => console.log(err));
    };

    handleConfirm();

    const asyncRead = async () => {
      const items = await handleListWsFiles();
      console.log(items);
      if (items) setFiles(items);
    };
    asyncRead();
  }, []);

  return (
    <div className="container mx-auto">
      <nav className="flex py-5 px-6">
        <div>
          <Link to="/">
            <button className="text-left font-semibold text-xl">
              Wave Page{" "}
              <span role="img" aria-label="" description="wave hand">
                👋🏼
              </span>
            </button>
          </Link>
        </div>
        <div className="flex-grow text-right text-xl"></div>
      </nav>
      <div>
        <div className="py-5 px-6 mt-24 border-b-4 border-gray-800 text-3xl">
          Audio Articles:
        </div>

        {files ? (
          <>
            {files.map((doc, index) => (
              <WsEntry
                key={doc.id + index}
                index={index}
                id={doc.id}
                name={doc.name}
                handleDeleteWSFile={() => handleDeleteWSFile(index, doc.id)}
              />
            ))}
          </>
        ) : (
          <div className="py-5 px-6">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default WsDashboard;
