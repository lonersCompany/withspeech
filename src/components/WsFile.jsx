import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Auth } from "aws-amplify";

import {
  downLoadWsFile,
  triggerGenAudioBlock,
  triggerGenSubtitleBlock,
  uploadWsFile,
} from "../actions/fetchFunctions";

import uuidv1 from "uuid/v1";

import WsPreview from "./WsPreview";
import WsEditor from "./WsEditor";
import CreateDocument from "./create-document";
import AuthLayer from "./AuthLayer";

const basicTextValue = [
  {
    type: "paragraph",
    children: [{ text: "Write something here :)" }],
  },
];

const generateAudioBlock = async (pollyBlock) => {
  //console.log(ssmlValue);

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
const getSSMLTextValue = (sentences, defaultVoice) => {
  //console.log(sentences);
  const paragrafTextValue = sentences.map((sentence) => sentence.text).join("");

  const secondVoice = paragrafTextValue.includes("--");
  console.log(secondVoice);

  const voice = secondVoice ? "Matthew" : defaultVoice;

  const ssmlValue = `<speak>${paragrafTextValue}<break time=\"1s\"/></speak>`;

  const pollyBlock = {
    text: ssmlValue,
    key: uuidv1(),
    voice: voice,
    ssml: true,
  };

  return pollyBlock;
};

function WsFile({ match }) {
  const [id] = useState(match.params.id);

  const [authUser, setAuth] = useState();
  const [authProcess, setAuthProcess] = useState(false);
  const [version, setVersion] = useState(0);
  const [name, setName] = useState(match.params.id);
  const [content, setContent] = useState([]);
  const [textValue, setTextValue] = useState();
  const [isEditor, setEditor] = useState(false);
  const [isPresentation, setPresentation] = useState(false);
  const [isAudioSync, setAudioSync] = useState(false);
  const [voice, setVoice] = useState("Salli");

  const toggleEditorVue = () => {
    if (isEditor && !isAudioSync) {
      setContent([]);
      handleAudioSync({ voice });
    }
    isEditor ? setEditor(false) : setEditor(true);
  };

  const handleSignOut = (e) => {
    Auth.signOut()
      .then((msg) => {
        setAuth();
      })
      .catch((err) => console.log(err));
  };

  const togglePresentationVue = () => {
    isPresentation ? setPresentation(false) : setPresentation(true);
  };

  const handleEditiorChange = (value) => {
    setTextValue(value);
    setAudioSync(false);
  };

  // GENERATE AUDIO
  const handleAudioSync = async ({ voice }) => {
    // TODO probably will be costed
    const contentPromisses = textValue.map((block) => {
      if (block.type === "image") {
        const newBlock = Object.assign({}, block);
        newBlock.id = uuidv1();
        return newBlock;
      }

      // BUM BUM!
      if (block.type === "paragraph") {
        const pollyBlock = getSSMLTextValue(block.children, voice);

        const newBlock = generateAudioBlock(pollyBlock);
        return newBlock;
      }
    });

    const content = await Promise.all(contentPromisses);
    if (content) {
      setContent(content);
      setAudioSync(true);
      const newName = content[0].children[0].text;
      setName(content[0].children[0].text);

      const uplodInput = {
        id,
        name: newName,
        content,
        voice,
        _version: version,
      };
      console.log(uplodInput);
      const responce = await uploadWsFile(uplodInput);

      console.log(responce);

      if (responce) {
        const { _version } = responce;
        const something = _version ? _version : 0;
        setVersion(something);
      }
    }
  };

  useEffect(() => {
    const renderWSFile = async () => {
      try {
        const response = await downLoadWsFile(match.params.id);

        const { content, voice, _version } = response;

        if (voice) setVoice(voice);
        if (_version) setVersion(_version);

        if (content === null) {
          setTextValue(basicTextValue);
          setEditor(true);
        } else {
          setAudioSync(true);
          setContent(content);
          setTextValue(content);
        }
      } catch (err) {
        console.error(err);
      }
    };

    renderWSFile();
  }, [match.params.id]);

  useEffect(() => {
    console.log("Use land on page. So how to reg him? ");
    const handleConfirm = () => {
      const responseConfirm = Auth.currentAuthenticatedUser();
      responseConfirm
        .then((msg) => {
          setAuth(msg.username);
        })
        .catch((err) => console.log(err));
    };

    handleConfirm();
  }, []);

  const handleVoiceChange = ({ target }) => {
    const voice = target.value;
    setVoice(voice);
    if (!isEditor) {
      setContent([]);
      handleAudioSync({ voice });
    }
  };

  return (
    <>
      <div className="lg:flex">
        <Sidebar>
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
          <div
            className={`${
              authUser ? "" : "opacity-50 pointer-events-none "
            } mb-5`}
          >
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
            <div className="relative font-semibold text-xl p-1 ">
              <form>
                <select
                  value={voice}
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
            </div>
            <CreateDocument />
          </div>

          {authUser ? (
            <button
              onClick={() => handleSignOut()}
              className="px-6 py-5 w-full text-left"
            >
              Sing Out <span className="opacity-50 text-xs">{authUser}</span>
            </button>
          ) : (
            <div className="m-2 px-5 py-5 rounded bg-blue-900">
              <p className="mb-2">Create and share your own audio articles</p>
              <button
                className="bg-green-500 px-2 rounded"
                onClick={() => setAuthProcess(true)}
              >
                Join us!
              </button>
            </div>
          )}
        </Sidebar>
        <div className="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
          <div className="text-xl lg:text-3xl">
            <div className="px-5 py-20 text-white font-serif min-h-screen article">
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
      </div>
      {authProcess ? (
        <AuthLayer setAuth={setAuth} setAuthProcess={setAuthProcess} />
      ) : (
        ""
      )}
    </>
  );
}

export default WsFile;
