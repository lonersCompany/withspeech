import React, { useState, useEffect } from "react";

function loadedCallback() {
  console.log("WoHooo I am loaded");
}

const Player = ({ audioObjects }) => {
  const [audioEl] = useState(new Audio());
  const [isActive, setActive] = useState(false);
  const [isContinue, setContinue] = useState(false);
  const [objectIndex, setObjectIndex] = useState(0);

  const changeBlockIndex = () => {
    const newIndex =
      objectIndex < audioObjects.length - 1 ? objectIndex + 1 : 0;
    console.log(newIndex);
    return newIndex;
  };

  const loadSrc = audioKEY => {
    const src = `https://text-with-speech.s3.eu-central-1.amazonaws.com/${audioKEY}`;
    audioEl.src = src;
    audioEl.load();
  };

  const prepareCurrentAudio = index => {
    const currentAudio = audioObjects[index];
    loadSrc(currentAudio.key);
    index > 0 ? audioEl.play() : setActive(false);
  };

  const playClick = () => {
    setActive(!isActive);
    isActive ? audioEl.pause() : audioEl.play();
  };

  audioEl.onended = () => {
    const newIndex = changeBlockIndex();
    prepareCurrentAudio(newIndex);
    setObjectIndex(newIndex);
  };

  // FOR PLAYER
  useEffect(() => {
    if (audioObjects.length > 0) {
      prepareCurrentAudio(objectIndex);
    }
  }, [audioObjects]);

  return (
    <button
      id="play"
      onClick={playClick}
      className="font-semibold text-xl tracking-tight"
    >
      {isActive ? "[ Stop ]" : "[ Play ]"}
    </button>
  );
};

export default Player;
