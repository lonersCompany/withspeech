import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createDocumentItem } from "../graphql/mutations";
import { Redirect } from "react-router-dom";
import { placeHolderValue } from "../slate/initials.js";

const CreateDocument = () => {
  const [documentUrl, setdocumentUrl] = useState();
  state = {
    documentUrl: false
  };
  [documentUrl, setdocumentUrl] = useState(false);
  handleNewDocument = async () => {
    // TODO: Create new doc function
    const payload = placeHolderValue;
    const { data } = await API.graphql(
      graphqlOperation(createDocumentItem, { input: payload })
    );

    console.log(`/doc/${data.createDocumentItem.id}`);
    this.setState(() => ({
      documentUrl: `/doc/${data.createDocumentItem.id}`
    }));

  //   console.log(data.createDocumentItem.id);
  // };

  if (this.state.documentUrl) {
    return <Redirect to={this.state.documentUrl} />;
  }

  return (
    <button
      onClick={handleNewDocument}
      className="inline-block text-sm px-4 py-2 leading-none border hover:border-teal-800 hover:text-teal-800 hover:bg-white mt-4 lg:mt-0"
    >
      + New document
    </button>
  );
};

export default CreateDocument;
