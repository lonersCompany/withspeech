import React, { useState, useEffect, useRef, useCallback } from "react";

const scrollToRef = (ref, position) => {
  console.log("scrollIntoView " + position);
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: position,
  });
};

function SentenceItem({ text, isActive, setActiveInline, index, position }) {
  const myRef = useRef(null);

  useEffect(() => {
    if (isActive) scrollToRef(myRef, position);
  }, [isActive, position]);

  const toggleAction = () => {
    if (isActive) scrollToRef(myRef, position);
    isActive ? setActiveInline(null) : setActiveInline(index);
  };

  return (
    <span
      ref={myRef}
      onClick={toggleAction}
      className={`speakable cursor-pointer hover:text-green-300 ${
        isActive ? "active" : "pasive"
      } ${isActive && position === "end" ? "pb-10 z-20" : ""}`}
    >
      {text}
    </span>
  );
}
const nullAudio = new Audio();
const TextElement = ({
  element,
  index,
  isActive,
  setActiveElement,
  presentationView,
}) => {
  const { id, children } = element;

  const [mediaPermition] = useState(true);
  const [audio, setAudio] = useState(nullAudio);
  const [sentences] = useState(children);
  const [activeInline, setActiveInline] = useState(null);

  //console.log("new Audio");

  // const playAudioObject = async (audio) => {
  //   try {
  //     await audio.play();
  //     setMediaPermition(true);
  //     return true;
  //   } catch (err) {
  //     setMediaPermition(false);
  //     return false;
  //   }
  // };

  const setTimeListener = useCallback(() => {
    audio.addEventListener(
      "timeupdate",
      function(e) {
        const currentTime = e.target.currentTime * 1000;
        sentences.forEach((item, index) => {
          if (
            !audio.paused &&
            currentTime >= item.start &&
            currentTime < item.end
          ) {
            setActiveInline(index);
          }
        });
      },
      false
    );
  }, [audio, setActiveInline, sentences]);

  const setEndListener = useCallback(() => {
    audio.addEventListener("ended", () => {
      setActiveElement(index + 1);
    });
  }, [audio, setActiveElement, index]);

  // Because of play button

  useEffect(() => {
    //console.count("set Audio");
    const { url } = element;
    setAudio(new Audio(url));
  }, [element, setAudio]);

  useEffect(() => {
    //console.log("setEventListeners");
    if (!isActive) {
      audio.pause();
      setActiveInline(null);
    }

    if (isActive && audio.paused) {
      audio.currentTime = 0;
      setTimeListener();
      setEndListener();
      audio.play();
    }
  }, [isActive, audio, setTimeListener, setEndListener]);

  // Audio controlers
  const setActiveInlineAndMore = (inlineIndex) => {
    setActiveInline(inlineIndex);

    if (inlineIndex != null) {
      const time = sentences[inlineIndex].start * 0.001;
      audio.currentTime = time;
      audio.play();
    }

    if (inlineIndex != null && !isActive) {
      setActiveElement(index);
      setTimeListener();
      setEndListener();
    }
    if (inlineIndex === null && isActive) {
      setActiveElement(null);
      audio.pause();
      // TODO: remove event listeners
    }
  };
  const position = presentationView ? "end" : "center";

  const sentenceItems = sentences.map((inline, index) => {
    // Correct! Key should be specified inside the array.

    const { text, start } = inline;

    const isActive = activeInline === index;

    const senteceKey = `${id}-${start}`;
    return (
      <SentenceItem
        key={senteceKey}
        id={senteceKey}
        isActive={isActive}
        setActiveInline={setActiveInlineAndMore}
        index={index}
        text={text}
        start={start}
        position={position}
      />
    );
  });

  return (
    <>
      {mediaPermition ? (
        ""
      ) : (
        <p className="bg-red-500 text-sm bg-gray-800 ">
          Allow autoplay in browser setting, or click into text again
        </p>
      )}
      <p className={`relative pb-10  ${isActive ? "active z-10" : "pasive"}`}>
        {sentenceItems}
      </p>
    </>
  );
};

export default TextElement;
