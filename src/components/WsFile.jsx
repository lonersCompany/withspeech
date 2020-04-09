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

const generateAudioBlock = async (ssmlValue, voice) => {
  console.log(ssmlValue);
  const pollyBlock = {
    text: ssmlValue,
    key: uuidv1(),
    voice: voice,
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
  console.log(sentences);
  const paragrafTextValue = sentences.map(sentence => sentence.text).join("");

  console.log(paragrafTextValue);

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
  const [voice, setVoice] = useState("Salli");

  const toggleEditorVue = () => {
    if (isEditor && !isAudioSync) {
      setContent([]);
      handleAudioSync({ voice });
    }
    isEditor ? setEditor(false) : setEditor(true);
  };

  const toggleReading = () => {
    const toggleReading = isReading === null ? 0 : null;
    setReading(toggleReading);

    if (isEditor) setEditor(false);
    if (!isAudioSync) {
      setContent([]);
      handleAudioSync({ voice });
    }
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
  const handleAudioSync = async ({ voice }) => {
    setLoading(true);

    // TODO probably will be costed
    const contentPromisses = textValue.map(block => {
      if (block.type === "image") {
        const newBlock = Object.assign({}, block);
        newBlock.id = uuidv1();
        return newBlock;
      }

      // BUM BUM!
      if (block.type === "paragraph") {
        const paragrafTextValue = getParagrafTextValue(block.children);

        const newBlock = generateAudioBlock(paragrafTextValue, voice);
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
        content,
        voice
      });
    }
  };

  useEffect(() => {
    const renderWSFile = async () => {
      try {
        const { name, content, voice } = await downLoadWsFile(id);

        // LOAD TEXT WITH SPEECH DOCUMENT
        if (name) setName(name);
        console.log(voice);
        if (voice) setVoice(voice);

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

  const handleVoiceChange = ({ target }) => {
    const voice = target.value;
    setVoice(voice);
    if (!isEditor) {
      setContent([]);
      handleAudioSync({ voice });
    }
  };

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
            {/* <div className="text-blue-700"> ctrl+E</div> */}
          </div>

          <div className={`tgl-btn ml-5 ${isEditor ? "active" : ""}`}></div>
        </button>
        <button
          className="flex block px-6 py-5 block w-full hover:bg-green-400"
          onClick={togglePresentationVue}
        >
          <div className="text-left flex-grow">
            <div className="font-semibold text-xl">Presentation</div>
            {/* <div className="text-blue-700"> ctrl+P</div> */}
          </div>

          <div
            className={`tgl-btn ml-5 ${isPresentation ? "active" : ""}`}
          ></div>
        </button>

        <div className="relative font-semibold text-xl p-1">
          <form>
            <select
              value={voice}
              defaultValue={voice}
              onChange={handleVoiceChange}
              className="block appearance-none w-full bg-gray-900 px-6 py-5 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Salli">Salli</option>
              <option value="Joanna">Joanna</option>
              <option value="Ivy">Ivy</option>
              <option value="Kendra">Kendra</option>
              <option value="Kimberly">Kimberly</option>

              <option value="Matthew">Matthew</option>
              <option value="Justin">Justin</option>
              <option value="Joey">Joey</option>
            </select>
          </form>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </Sidebar>
      <div className="bg-gray-900 text-white min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
        <div className="max-w-xl text-2xl m-auto py-20 min-h-screen article">
          <div className={isReading === null ? "" : "opacity-25"}>
            <button
              onClick={toggleReading}
              className="bg-blue-500 hover:bg-blue-400 px-4 rounded-lg mb-10"
            >
              Click into text to {isReading === null ? "start" : "stop"}
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
