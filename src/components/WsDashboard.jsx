import React, { useState, useEffect, useCallback } from "react";
import { deleteWsFile, handleListWsFiles } from "../actions/fetchFunctions";
import { Link } from "react-router-dom";
//import { Auth } from "aws-amplify";

function WsDashboard() {
  const [files, setFiles] = useState([]);

  const handleDeleteWSFile = (index, id) => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    deleteWsFile(id);
  };

  const fetchMyAPI = useCallback(async () => {
    const items = await handleListWsFiles();
    console.log(items);
    if (items) setFiles(items);
  }, []);

  useEffect(() => {
    // On load of page run handleListNotes function

    // const handleConfirm = () => {
    //   const responseConfirm = Auth.currentCredentials();
    //   responseConfirm
    //     .then((msg) => console.log(msg))
    //     .catch((err) => console.log(err));
    // };

    // handleConfirm();
    fetchMyAPI();
  }, [fetchMyAPI]);

  const entries = files.map((doc, index) => {
    const { id, name } = doc;
    const link = `doc/${id}`;
    return (
      <div key={id} className="flex border-b-4 border-gray-800 text-2xl">
        <Link to={link} className="flex-1 w-full py-5 px-6 hover:bg-green-400">
          <h2 className="">
            <span role="img" aria-label="document">
              📄
            </span>{" "}
            {name}
          </h2>
        </Link>
        <button
          onClick={() => handleDeleteWSFile(index, id)}
          className="py-5 px-6 hover:bg-blue-700"
        >
          X
        </button>
      </div>
    );
  });

  return (
    <div className="container mx-auto">
      <nav className="flex py-5 px-6">
        <div>
          <Link to="/">
            <button className="text-left font-semibold text-xl">
              Wave Page{" "}
              <span role="img" aria-label="" description="wave hand">
                🌀
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

        {files.length > 0 ? (
          <div>{entries}</div>
        ) : (
          <div className="py-5 px-6">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default WsDashboard;
