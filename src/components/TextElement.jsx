import React, { useState, useEffect, useRef, useCallback } from "react";

// const scrollToRef = (ref, position) => {
//   ref.current.scrollIntoView({
//     behavior: "smooth",
//     block: position,
//   });
// };

function SentenceItem({
  text,
  isActive,
  setActiveInline,
  index,
  presentationView,
}) {
  //const myRef = useRef(null);

  // useEffect(() => {
  //   const position = presentationView ? "end" : "center";
  //   if (sentenceActive) scrollToRef(myRef, position);
  // }, [sentenceActive, presentationView]);

  const toggleAction = (params) => {
    isActive ? setActiveInline(null) : setActiveInline(index);
  };

  return (
    <span
      //ref={myRef}
      onClick={toggleAction}
      className={`speakable cursor-pointer hover:text-green-300 ${
        isActive ? "active" : "pasive"
      } ${presentationView ? "pb-10" : ""}`}
    >
      {text}
    </span>
  );
}

const TextElement = ({
  element,
  index,
  isActive,
  setActiveElement,
  presentationView,
}) => {
  const { id, children, url } = element;

  const [mediaPermition, setMediaPermition] = useState(true);
  const [audio, setAudio] = useState(new Audio(url));
  const [sentences] = useState(children);
  const [activeInline, setActiveInline] = useState(null);

  console.log("new Audio");

  const playAudioObject = async (audio) => {
    try {
      await audio.play();
      setMediaPermition(true);
      return true;
    } catch (err) {
      setMediaPermition(false);
      return false;
    }
  };

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
  }, [audio, setActiveElement, sentences]);

  const setEndListener = useCallback(() => {
    audio.addEventListener("ended", () => {
      setActiveElement(index + 1);
    });
  }, [audio, setActiveElement, index]);

  // Because of play button

  useEffect(() => {
    console.log("element");
  }, [element]);

  useEffect(() => {
    console.log("setEventListeners");
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

  const sentenceItems = sentences.map((inline, index) => {
    // Correct! Key should be specified inside the array.

    const { text, start } = inline;
    return (
      <SentenceItem
        key={`${id}-${start}`}
        id={`${id}-${start}`}
        isActive={activeInline === index}
        setActiveInline={setActiveInlineAndMore}
        index={index}
        text={text}
        start={start}
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
      <p
        className={`relative pb-10 transparent-bg ${
          isActive ? "active z-10 text-green-500" : "pasive"
        }`}
      >
        {sentenceItems}
      </p>
    </>
  );
};

export default TextElement;
