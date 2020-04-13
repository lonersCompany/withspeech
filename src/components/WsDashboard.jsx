import React, { useState, useEffect } from "react";
import WsEntry from "./WsEntry";
import { deleteWsFile, handleListWsFiles } from "../actions/fetchFunctions";
import Sidebar from "./Sidebar";
import CreateDocument from "./create-document";
import { useHistory } from "react-router-dom";

function WsDashboard() {
  const [files, setFiles] = useState(false);
  let history = useHistory();

  const handleDeleteWSFile = (index, id) => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    deleteWsFile(id);
  };

  useEffect(() => {
    // On load of page run handleListNotes function
    const asyncRead = async () => {
      const items = await handleListWsFiles();
      console.log(items);
      if (items) setFiles(items);
    };
    asyncRead();
  }, []);

  return (
    <div className="lg:flex text-white ">
      <Sidebar>
        <CreateDocument />
      </Sidebar>

      <div className="pt-20 bg-gray-900 min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
        <div className="">
          <div className=" py-5 px-6 border-b-4 border-gray-800 text-3xl">
            Documents:
          </div>

          {files ? (
            <>
              {files.map((doc, index) => (
                <WsEntry
                  key={doc.id}
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
    </div>
  );
}

export default WsDashboard;
