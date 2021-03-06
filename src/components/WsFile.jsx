import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Auth } from "aws-amplify";

import { useHistory } from "react-router-dom";

import {
  downLoadWsFile,
  triggerGenAudioBlock,
  triggerGenSubtitleBlock,
  uploadWsFile,
  createWsFile,
} from "../actions/fetchFunctions";

import { getSSMLTextValue } from "../actions/manipulationFunctions";

import uuidv1 from "uuid/v1";

import WsPreview from "./WsPreview";
import WsEditor from "./WsEditor";
import AuthLayer from "./AuthLayer";

const basicTextValue = [
  {
    type: "paragraph",
    children: [{ text: "Write something here :)" }],
  },
];

const basicPreviewValue = [
  {
    children: [{ start: 0, end: 999999, text: "Write something here :)" }],
    id: "0b39bba0-af32-11ea-a27f-ddd820513dc1",
    type: "paragraph",
    url:
      "https://text-with-speech.s3.eu-central-1.amazonaws.com/0b39bba0-af32-11ea-a27f-ddd820513dc1",
  },
];

const errorPreviewValue = {
  children: [
    {
      start: 0,
      end: 999999,
      text: "WavePage cannot generate this paragraph",
    },
  ],
  id: "448546b0-b31d-11ea-a467-7343eba22b03",
  url:
    "https://text-with-speech.s3.eu-central-1.amazonaws.com/448546b0-b31d-11ea-a467-7343eba22b03",
  type: "paragraph",
};

const generateAudioBlock = async (pollyBlock) => {
  //console.log(ssmlValue);

  try {
    // Request speakable blocks
    const children = await triggerGenSubtitleBlock(pollyBlock);

    // Request Auido key
    const audioKey = await triggerGenAudioBlock(pollyBlock);

    // if children or audioKey is null return error block
    if (!children || !audioKey) {
      return errorPreviewValue;
    }

    const url =
      "https://text-with-speech.s3.eu-central-1.amazonaws.com/" + audioKey;

    const id = audioKey;

    const type = "paragraph";

    return { children, url, id, type };
  } catch (err) {
    console.log("now is err");
    console.log(err);
  }
};

function WsFile({ match }) {
  const [id, setId] = useState(match.params.id);

  const [authUser, setAuth] = useState();
  const [authProcess, setAuthProcess] = useState(false);
  const [version, setVersion] = useState(0);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [textValue, setTextValue] = useState();
  const [isEditor, setEditor] = useState(false);
  const [isPresentation, setPresentation] = useState(false);
  const [isAudioSync, setAudioSync] = useState(false);
  const [voice, setVoice] = useState("Matthew");

  const history = useHistory();

  const createNewDocument = async () => {
    const { id } = await createWsFile();
    setId(id);
    history.push(`/doc/${id}`);
  };

  const toggleEditorVue = () => {
    if (isEditor && !isAudioSync) {
      setIsLoading(true);
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

  const togglepresentationView = () => {
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
      let newBlock = Object.assign({}, block);

      if (block.type === "image") {
        newBlock.id = uuidv1();
      }

      if (block.type === "paragraph") {
        const pollyBlock = getSSMLTextValue(block.children, voice);

        newBlock = generateAudioBlock(pollyBlock);
      }

      return newBlock;
    });

    const content = await Promise.all(contentPromisses);
    if (content) {
      setContent(content);
      setAudioSync(true);
      const newName = content[0].children[0].text;
      setIsLoading(false);
      const uplodInput = {
        id,
        name: newName,
        content,
        voice,
        _version: version,
      };
      console.log(uplodInput);
      const responce = await uploadWsFile(uplodInput);

      if (responce) {
        const { _version } = responce;
        const correctVersion = _version ? _version : 0;

        setVersion(correctVersion);
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

        // SET EDITOR TO BASIC
        if (content === null) {
          setTextValue(basicTextValue);
          setVoice("Matthew");
          setContent(basicPreviewValue);
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
          <div className={`${authUser ? "" : "pointer-events-none blure"}`}>
            <div className="px-2 py-1">
              <button
                className="flex block px-6 py-4 bg-blue-900 w-full rounded hover:bg-green-500 focus:outline-none"
                onClick={toggleEditorVue}
              >
                <div className="text-left flex-grow">
                  <div className=" text-xl">Edit</div>
                  {/* <div className="text-blue-700"> ctrl+E</div> */}
                </div>

                <div
                  className={`tgl-btn ml-5 ${
                    isEditor ? "active bg-green-600" : "bg-gray-800"
                  }`}
                ></div>
              </button>
            </div>

            <div className={`${isEditor ? "hidden" : ""} px-2 py-1`}>
              <button
                className="flex block px-6 py-4 bg-blue-900 w-full rounded hover:bg-green-500 focus:outline-none"
                onClick={togglepresentationView}
              >
                <div className="text-left flex-grow">
                  <div className=" text-xl">Presentation</div>
                </div>

                <div
                  className={`tgl-btn ml-5 ${
                    isPresentation ? "active bg-green-600" : "bg-gray-800"
                  }`}
                ></div>
              </button>
            </div>

            <div className="text-xl px-2 py-1">
              <form>
                <select
                  value={voice}
                  onChange={handleVoiceChange}
                  className="block cursor-pointer hover:bg-green-500 appearance-none w-full bg-blue-900 px-6 py-5 rounded leading-tight focus:outline-none focus:shadow-outline "
                >
                  <option value="Salli">Voice: Salli</option>
                  <option value="Joanna">Voice: Joanna</option>
                  <option value="Ivy">Voice: Ivy</option>
                  <option value="Kendra">Voice: Kendra</option>
                  <option value="Kimberly">Voice: Kimberly</option>

                  <option value="Matthew">Voice: Matthew</option>
                  <option value="Justin">Voice: Justin</option>
                  <option value="Joey">Voice: Joey</option>
                  <option value="Zhiyu">Voice: Zhiyu</option>
                </select>
              </form>
            </div>
            <div className="px-2 py-1">
              <button
                type="button"
                onClick={createNewDocument}
                className="rounded px-6 py-5 text-left block w-full  text-xl hover:bg-green-500 bg-blue-900"
              >
                + New Page
              </button>
            </div>
          </div>

          <div className="px-2 py-1 mt-20">
            {authUser ? (
              <button
                className="flex block px-6 py-4 bg-blue-900 w-full rounded hover:bg-green-500 focus:outline-none"
                onClick={() => handleSignOut()}
              >
                Log out
              </button>
            ) : (
              <div className=" px-5 py-5 rounded bg-blue-900">
                <p className="mb-2 ">Become a Beta Tester</p>
                <button
                  className="bg-green-500 rounded px-3 py-2"
                  onClick={() => setAuthProcess(true)}
                >
                  Sign in{" "}
                  <span role="img" aria-label="" description="black hard">
                    ♥️
                  </span>
                </button>
              </div>
            )}
          </div>
          <div className="px-2 py-1">
            <div className="block px-5 py-5 rounded bg-blue-900">
              <div>
                <span role="img" aria-label="" description="envelope">
                  ✉️
                </span>{" "}
                Chat with me
              </div>

              <div>
                <a
                  className="text-blue-500"
                  href="mailto:simon@loners.company "
                >
                  simon@loners.company
                </a>
              </div>
            </div>
          </div>
        </Sidebar>
        <div className="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">
          <div
            className={` min-h-screen article container ${
              isPresentation ? "text-3xl" : "text-3xl"
            }`}
          >
            {isEditor ? (
              <WsEditor
                textValue={textValue}
                handleEditiorChange={handleEditiorChange}
              />
            ) : (
              <WsPreview
                content={content}
                presentationView={isPresentation}
                isLoading={isLoading}
              />
            )}
          </div>
          <div className="text-center text-lg text-blue-500 pb-20 ">
            made with wavepage.app
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
