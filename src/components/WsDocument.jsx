import React, { useState, useEffect } from "react";

import {
  readWsFile,
  handleDeleteAudioFile,
  callGenerativeLambda,
  saveAudioObjects,
  saveWsFile
} from "../actions/fetchFunctions";
import {
  removeEmptyStrings,
  getRitchBlocks
} from "../actions/manipulationFunctions";

import WsEditor from "./WsEditor";
import WsPlayer from "./WsPlayer";

const saveFileObjects = (document, id) => {
  const documentModified = {
    nodes: removeEmptyStrings(document)
  };
  const documentName = document.nodes[0].nodes[0].text;
  const payload = {
    id: id,
    document: documentModified,
    name: documentName,
    audioFiles: null
  };
  saveWsFile(payload);
};

const deleteAudioFiles = objects =>
  objects.map(object => handleDeleteAudioFile(object.key));

const requestAudioObjects = textObject => {
  const ritchBlocks = getRitchBlocks(textObject);
  const audioObjPromises = ritchBlocks.map(block =>
    callGenerativeLambda(block)
  );
  return audioObjPromises;
};

function WsDocument({ match }) {
  const [id] = useState(match.params.id);
  const [textObject, setTextObject] = useState(undefined);
  const [audioObjects, setAudioObjects] = useState(undefined);

  // Get state from audio
  const [isLoading, setLoading] = useState(false);

  // SLATE GET VALUE
  const fetchFileObjects = async id => {
    const responseWsFile = readWsFile(id);

    const { responseDocumentObject, responseAudioObject } = responseWsFile;

    if (responseDocumentObject) {
      setTextObject(responseDocumentObject);
    }

    if (responseAudioObject) {
      setAudioObjects(responseAudioObject);
    }
  };

  const handleEdtiorChange = document => {
    setTextObject(document);
    saveFileObjects(document, id);

    if (audioObjects) {
      setAudioObjects(undefined);
      deleteAudioFiles(audioObjects);
    }
  };

  // GENERATE AUDIO
  const handleSynchronizeAudio = async () => {
    setLoading(true);
    const promiseAudioObjs = requestAudioObjects(textObject);
    const responseAudioObjs = await Promise.all(promiseAudioObjs);

    if (responseAudioObjs) {
      // update react state
      setAudioObjects(responseAudioObjs);
      setLoading(false);

      // save keys to databse file object
      await saveAudioObjects({ id, responseAudioObjs });
    }
  };

  useEffect(() => {
    // On load of page run handleListNotes function
    fetchFileObjects(id);
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-lg my-40">
          {textObject ? (
            <WsEditor
              document={textObject}
              handleEdtiorChange={handleEdtiorChange}
            />
          ) : (
            <h2>...</h2>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 bg-gray-200-t p-6">
        {audioObjects ? (
          <WsPlayer audioObjects={audioObjects} />
        ) : (
          <button
            className="font-semibold text-xl tracking-tight"
            id="play"
            onClick={handleSynchronizeAudio}
          >
            {isLoading ? "[ Loading ]" : "[ Generate ]"}
          </button>
        )}
      </div>
    </div>
  );
}

export default WsDocument;
