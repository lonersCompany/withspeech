import React, { useState, useEffect } from "react";

import {
  readWsFile,
  triggerGenAudioBlock,
  triggerGenSubtitleBlock,
  uploadWsFile
} from "../actions/fetchFunctions";

import { Node } from "slate";

import uuidv1 from "uuid/v1";

import WsPreview from "./WsPreview";
import WsEditor from "./WsEditor";

const renameObjFiled = (obj, old_key, new_key) => {
  if (old_key !== new_key) {
    Object.defineProperty(
      obj,
      new_key,
      Object.getOwnPropertyDescriptor(obj, old_key)
    );
    delete obj[old_key];
  }
  return obj;
};

//import smd from "speechmarkdown-js";
const smd = require("speechmarkdown-js");

const serialize = nodes => {
  return nodes
    .map(n => {
      if (n.type === "image") {
        const imageSSML = `i<mark name="${n.url}" />mage`;
        return imageSSML;
      }

      return Node.string(n);
    })
    .join("\n");
};

// const parseToSSML = markdown => {
//   //const markdown = `Sample [3s] speech [250ms] markdown`;
//   const options = {
//     platform: "amazon-alexa"
//   };

//   const speech = new smd.SpeechMarkdown();
//   const ssml = speech.toSSML(markdown, options);

//   return ssml;
// };

const generateAudioBlock = async ssmlValue => {
  const pollyBlock = {
    text: ssmlValue,
    key: uuidv1(),
    voice: "Salli",
    ssml: true
  };

  // Request speakable blocks
  const LambdaReturn = await triggerGenSubtitleBlock(pollyBlock);

  const children = LambdaReturn.map(obj => {
    const renamedObj = renameObjFiled(obj, "value", "text");

    return renamedObj;
  });

  // Request Auido key
  const audioKey = await triggerGenAudioBlock(pollyBlock);

  const url =
    "https://text-with-speech.s3.eu-central-1.amazonaws.com/" + audioKey;

  const type = "paragraph";

  const id = audioKey;

  return { children, url, id, type };
};

function WsFile({ match }) {
  const [id] = useState(match.params.id);

  const [document, setDocument] = useState({});

  const [speakableDocs, setSpeakableDocs] = useState([
    "<speak>Add your text</speak>"
  ]);
  const [textValue, setTextValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Add your text" }]
    }
  ]);
  const [isLoading, setLoading] = useState(false);
  const [isEditor, setEditor] = useState(false);
  const [isAudioSync, setAudioSync] = useState(false);

  const handleEditiorChange = value => {
    setTextValue(value);
    setAudioSync(false);
  };

  // GENERATE AUDIO
  const handleSyncAudio = async () => {
    setLoading(true);

    const content = textValue.map(block => {
      if (block.type === "paragraph") {
        const searileValue = `<speak>${block.children[0].text}</speak>`;
        const generatedBlock = generateAudioBlock(searileValue);
        return generatedBlock;
      }

      if (block.type === "image") {
        block.id = uuidv1();
        return block;
      }
    });

    Promise.all(content).then(content => {
      console.log(content); // [3, 1337, "foo"]

      const document = {
        id,
        name: id,
        content
      };

      console.log(content);
      uploadWsFile(document);
      setDocument(document);

      setLoading(false);
      setAudioSync(true);
    });
  };

  const toggleEditorVue = () => {
    if (isEditor && !isAudioSync) {
      handleSyncAudio();
    }
    isEditor ? setEditor(false) : setEditor(true);
  };

  const renderWSFile = async () => {
    try {
      const fileData = await readWsFile(id);

      // LOAD TEXT WITH SPEECH DOCUMENT
      setDocument(fileData);

      const { content } = fileData;

      if (content) setTextValue(content);
      if (content) setAudioSync(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    renderWSFile();
  }, []);

  return (
    <div className={isEditor ? "bg-white" : "bg-gray-200"}>
      <div className="max-w-xl text-xl m-auto py-20 min-h-screen">
        {isEditor ? (
          <WsEditor
            textValue={textValue}
            handleEditiorChange={handleEditiorChange}
          />
        ) : isLoading ? (
          "( Loading )"
        ) : (
          <WsPreview document={document} />
        )}
      </div>
      <div className="fixed bottom-0 bg-gray-200-t p-6">
        <button
          className="bg-white hover:bg-gray-200 py-2 px-4 rounded-full border border-black"
          onClick={toggleEditorVue}
        >
          {isEditor ? "Listen" : isLoading ? "Loading" : "Edit"} (ctrl + E)
        </button>
      </div>
    </div>
  );
}

export default WsFile;
