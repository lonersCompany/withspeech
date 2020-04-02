import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listDocumentItems } from "../graphql/queries";
import WsEntry from "./WsEntry";
import { deleteWsFile } from "../actions/fetchFunctions";
import Sidebar from "./Sidebar";
import CreateDocument from "./create-document";
import { useHistory } from "react-router-dom";

function WsDashboard() {
  const [files, setFiles] = useState([]);
  let history = useHistory();

  const handleListWsFiles = async () => {
    // Use aplify api graphql method to request graphql queries
    // that we improt by name "listNotes"

    try {
      const { data } = await API.graphql(graphqlOperation(listDocumentItems));
      console.log("now");
      console.log(data);
      const { items } = data.listDocumentItems;
      if (items.length > 0) setFiles(items);
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
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
    <div className="lg:flex text-white ">
      <Sidebar>
        <CreateDocument />
      </Sidebar>

      <div className="pt-20 bg-gray-900 min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
        <div className="">
          {files ? (
            <div className=" py-5 px-6 border-b-4 border-gray-800 text-3xl">
              Documnets:
            </div>
          ) : (
            ""
          )}
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
    </div>
  );
}

export default WsDashboard;
