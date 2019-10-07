import React, { useState, useEffect } from "react";

import {
  readWsFile,
  triggerDeleteAudioBlock,
  triggerGenAudioBlock,
  saveAudioObjects,
  uploadWsFile
} from "../actions/fetchFunctions";
import {
  removeEmptyStrings,
  getRitchBlocks
} from "../actions/manipulationFunctions";

import WsEditor from "./WsEditor";
import WsPlayer from "./WsPlayer";

const saveWsFile = (document, id) => {
  // Set document name
  const name = document.nodes[0].nodes[0].text;

  // Remove empty string bug
  const documentModified = {
    nodes: removeEmptyStrings(document)
  };

  // Remove audioFile,
  // TODO:
  // QUESTION: how to delete audio files,
  // when document is updated.
  const audioFiles = null;

  // CALL CRUD FUNCTION uploadWsFile
  uploadWsFile({
    id,
    name,
    audioFiles,
    document: documentModified
  });
};

const requestAudioObjects = textObject => {
  const ritchBlocks = getRitchBlocks(textObject);
  console.log(ritchBlocks);
  const audioObjPromises = ritchBlocks.map(block =>
    triggerGenAudioBlock(block)
  );
  return audioObjPromises;
};

function WsFile({ match }) {
  const [id] = useState(match.params.id);
  const [textObject, setTextObject] = useState(undefined);
  const [audioObjects, setAudioObjects] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  // SLATE GET VALUE
  const renderWSFile = async id => {
    const responseWsFile = await readWsFile(id);

    const { document, audioFiles } = responseWsFile;

    if (document) {
      setTextObject(document);
    }

    if (audioFiles) {
      setAudioObjects(audioFiles);
    }
  };

  const handleEdtiorChange = document => {
    setTextObject(document);
    setAudioObjects(undefined);

    saveWsFile(document, id);

    // Delete audioFile becouse they are no longer sync
    // QUESTION: Delete audio files in edtior Change event?
    if (audioObjects) {
      audioObjects.forEach(object => triggerDeleteAudioBlock(object.key));
    }
    //
  };

  // GENERATE AUDIO
  const handlesyncAudio = async () => {
    setLoading(true);
    const promiseAudioObjs = requestAudioObjects(textObject);
    const audioFiles = await Promise.all(promiseAudioObjs);

    if (audioFiles) {
      // update react state
      setAudioObjects(audioFiles);
      setLoading(false);

      // save keys to databse file object
      await saveAudioObjects({ id, audioFiles });
    }
  };

  useEffect(() => {
    // On load of page run handleListNotes function
    renderWSFile(id);
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
            onClick={handlesyncAudio}
          >
            {isLoading ? "[ Loading ]" : "[ Generate ]"}
          </button>
        )}
      </div>
    </div>
  );
}

export default WsFile;
