import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { createWsFile } from "../actions/fetchFunctions";

// import { useHistory } from "react-router";

const CreateDocument = () => {
  const [documentUrl, setDocumentUrl] = useState();

  const handleCreateWsFile = async () => {
    // TODO: Create new doc function

    const { id } = await createWsFile();

    setDocumentUrl(`/doc/${id}`);
  };

  if (documentUrl) {
    return <Redirect to={documentUrl} />;
  }

  return (
    <div>
      <button
        type="button"
        className="bg-white hover:bg-gray-200 py-2 px-4 rounded-full border border-black"
        onClick={handleCreateWsFile}
      >
        + New document
      </button>
    </div>
  );
};

const Nav = () => {
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 mr-6 hover:text-teal-700">
          <span className="font-semibold text-xl tracking-tight">
            <Link to="/">
              Wave Page{" "}
              <span role="img" description="wave hand">
                {" "}
                👋
              </span>
            </Link>
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded border-teal-500 hover:text-teal-700 hover:text-teal-700">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          <div>
            <CreateDocument />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
