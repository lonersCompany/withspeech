import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
//import { withAuthenticator } from "aws-amplify-react";

import {
  downLoadWsFile,
  triggerGenAudioBlock,
  triggerGenSubtitleBlock,
  uploadWsFile
} from "../actions/fetchFunctions";

import uuidv1 from "uuid/v1";

import WsPreview from "./WsPreview";
import WsEditor from "./WsEditor";
import CreateDocument from "./create-document";

const generateAudioBlock = async ssmlValue => {
  console.log(ssmlValue);
  const pollyBlock = {
    text: ssmlValue,
    key: uuidv1(),
    voice: "Salli",
    ssml: true
  };
  try {
    // Request speakable blocks
    const children = await triggerGenSubtitleBlock(pollyBlock);
    if (children) console.log("children are ready");

    // Request Auido key
    const audioKey = await triggerGenAudioBlock(pollyBlock);
    if (audioKey) console.log("audioKey is ready");

    const url =
      "https://text-with-speech.s3.eu-central-1.amazonaws.com/" + audioKey;

    const type = "paragraph";

    const id = audioKey;

    return { children, url, id, type };
  } catch (err) {
    console.log(err);
  }
};

// Conver Editor to content Value
const getParagrafTextValue = sentences => {
  const paragrafTextValue = sentences.map(sentence => sentence.text).toString();

  return `<speak>${paragrafTextValue}</speak>`;
};

function WsFile({ match }) {
  const [id] = useState(match.params.id);
  const [name, setName] = useState(match.params.id);
  const [content, setContent] = useState([]);
  const [textValue, setTextValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Add your text" }]
    }
  ]);
  const [isLoading, setLoading] = useState(false);
  const [isEditor, setEditor] = useState(false);
  const [isPresentation, setPresentation] = useState(false);
  const [isAudioSync, setAudioSync] = useState(false);
  const [isReading, setReading] = useState(null);

  const toggleEditorVue = () => {
    if (isEditor && !isAudioSync) {
      handleSyncAudio();
    }
    isEditor ? setEditor(false) : setEditor(true);
  };

  const toggleReading = () => {
    const toggleReading = isReading === null ? 0 : null;
    setReading(toggleReading);

    if (isEditor) setEditor(false);
    if (!isAudioSync) handleSyncAudio();
  };

  const togglePresentationVue = () => {
    isPresentation ? setPresentation(false) : setPresentation(true);
  };

  const handleEditiorChange = value => {
    //console.log(value);
    setName(value[0].children[0].text);
    setTextValue(value);
    setAudioSync(false);
  };

  // GENERATE AUDIO
  const handleSyncAudio = async () => {
    setLoading(true);

    // TODO probably will be costed

    let slideNumber = 0;
    const contentPromisses = textValue.map(block => {
      if (block.type === "image") {
        slideNumber = slideNumber + 1;

        const newBlock = Object.assign({}, block);
        newBlock.id = uuidv1();
        newBlock.slideNumber = slideNumber;
        return newBlock;
      }

      // BUM BUM!
      if (block.type === "paragraph") {
        const paragrafTextValue = getParagrafTextValue(block.children);
        console.log(paragrafTextValue);
        const newBlock = generateAudioBlock(paragrafTextValue);
        return newBlock;
      }
    });

    const content = await Promise.all(contentPromisses);
    if (content) {
      console.log(content);
      setContent(content);
      setLoading(false);
      setAudioSync(true);
      uploadWsFile({
        id,
        name,
        content
      });
    }
  };

  useEffect(() => {
    const renderWSFile = async () => {
      try {
        const { name, content } = await downLoadWsFile(id);

        // LOAD TEXT WITH SPEECH DOCUMENT
        if (name) setName(name);

        if (content === null) setEditor(true);
        const str = JSON.stringify(content, null, 4); // (Optional) beautiful indented output.
        //console.log(str); // Logs output to dev tools consol
        console.log(content);
        if (content) setContent(content);
        if (content) setTextValue(content);
        if (content) setAudioSync(true);
      } catch (err) {
        console.error(err);
      }
    };

    renderWSFile();
  }, [id]);

  return (
    <div className="lg:flex">
      <Sidebar>
        <CreateDocument />
        <button
          className="flex block px-6 py-5 block w-full hover:bg-green-400"
          onClick={toggleEditorVue}
        >
          <div className="text-left flex-grow">
            <div className="font-semibold text-xl">Edit</div>
            <div className="text-blue-700"> ctrl+E</div>
          </div>

          <div className={`tgl-btn ml-5 ${isEditor ? "active" : ""}`}></div>
        </button>
        <button
          className="flex block px-6 py-5 block w-full hover:bg-green-400"
          onClick={togglePresentationVue}
        >
          <div className="text-left flex-grow">
            <div className="font-semibold text-xl">Presentation</div>
            <div className="text-blue-700"> ctrl+P</div>
          </div>

          <div
            className={`tgl-btn ml-5 ${isPresentation ? "active" : ""}`}
          ></div>
        </button>
      </Sidebar>
      <div className="bg-gray-900 text-white min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
        <div className="max-w-xl text-2xl m-auto py-20 min-h-screen article">
          <div>
            <button
              onClick={toggleReading}
              className="bg-blue-500 hover:bg-blue-400 px-4 rounded-lg mb-10"
            >
              Click into text to {isReading === null ? "Start" : "Stop"}
            </button>
          </div>
          {isEditor ? (
            <WsEditor
              textValue={textValue}
              handleEditiorChange={handleEditiorChange}
            />
          ) : (
            <WsPreview
              content={content}
              presentationVue={isPresentation}
              isReading={isReading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default WsFile;
