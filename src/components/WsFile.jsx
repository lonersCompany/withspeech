import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./nav";
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

const generateAudioBlock = async (ssmlValue, slideNumber) => {
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

    return { children, url, id, type, slideNumber };
  } catch (err) {
    console.log(err);
  }
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
  const [isPresentation, setPresentation] = useState(true);
  const [isAudioSync, setAudioSync] = useState(false);

  const toggleEditorVue = () => {
    if (isEditor && !isAudioSync) {
      handleSyncAudio();
    }
    isEditor ? setEditor(false) : setEditor(true);
  };

  const togglePresentationVue = () => {
    isPresentation ? setPresentation(false) : setPresentation(true);
  };

  const handleEditiorChange = value => {
    console.log(value);
    console.log(value[0].children[0].text);
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

      if (block.type === "paragraph") {
        const searileValue = `<speak>${block.children[0].text}</speak>`;
        const newBlock = generateAudioBlock(searileValue, slideNumber);
        return newBlock;
      }
    });

    setContent(contentPromisses);
    const content = await Promise.all(contentPromisses);
    if (content) {
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
      <div className="bg-gray-800 text-white hidden fixed inset-0 pt-16 h-full z-90 w-full border-b -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5">
        <Nav>
          <Link to="/dashboard">
            <button className="px-6 py-5 w-full text-left font-semibold text-xl tracking-tight hover:bg-green-300">
              <span role="img" description="wave hand">
                🙋🏽
              </span>{" "}
              Wave Page
            </button>
          </Link>
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
        </Nav>
      </div>
      <div className="bg-gray-900 text-white min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
        <div className="max-w-xl text-2xl m-auto py-20 min-h-screen">
          {isEditor ? (
            <WsEditor
              textValue={textValue}
              handleEditiorChange={handleEditiorChange}
            />
          ) : (
            <WsPreview content={content} presentationVue={isPresentation} />
          )}
        </div>
      </div>
    </div>
  );
}

export default WsFile;
