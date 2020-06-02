import React, { useState, useEffect, useRef } from "react";

const scrollToRef = (ref, presentationVue) => {
  const position = presentationVue ? "end" : "center";

  ref.current.scrollIntoView({
    behavior: "smooth",
    block: position,
  });
};

function SentenceItem({ text, start, sentenceActive, speak, presentationVue }) {
  const myRef = useRef(null);
  //const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    if (sentenceActive) scrollToRef(myRef, presentationVue);
  }, [sentenceActive]);

  //const sentenceView = presentationVue ? "block pb-10" : "inline";

  return (
    <span
      ref={myRef}
      onClick={() => speak(start, sentenceActive, true)}
      className={`speakable ${sentenceActive ? "active z-10" : "pasive"} `}
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
  presentationVue,
}) => {
  const { id, children, url } = element;
  const [mediaPermition, setMediaPermition] = useState(true);
  const [audio] = useState(new Audio(url));
  const [sentenceIndex, setSentenceIndex] = useState(null);
  const [sentences, setSentences] = useState(children);

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

  const speakTextBlock = (start, pause, resetElements) => {
    switch (pause) {
      case true:
        audio.removeEventListener("timeupdate", () => {
          console.log("timeupdate");
        });

        audio.pause();

        if (sentenceIndex !== null) {
          let newSentences = [...sentences];
          newSentences[sentenceIndex].sentenceActive = false;
          setSentences(newSentences);
        }

        if (resetElements) setActiveElement(null);
        break;
      default:
        audio.currentTime = start * 0.001;
        audio.addEventListener(
          "timeupdate",
          function(e) {
            const currentTime = e.target.currentTime * 1000;
            const newSentences = sentences.map((item, index) => {
              const itemTiming =
                !audio.paused &&
                currentTime >= item.start &&
                currentTime < item.end;
              if (itemTiming) setSentenceIndex(index);
              item.sentenceActive = itemTiming;
              return item;
            });

            setSentences(newSentences);
          },
          false
        );

        audio.addEventListener("ended", () => {
          setActiveElement(index + 1);
        });

        const isPlayAlowed = playAudioObject(audio);
        if (isPlayAlowed) setActiveElement(index);
    }
  };

  useEffect(() => {
    if (!isActive && !audio.paused) speakTextBlock(0, true);
    if (isActive && audio.paused) speakTextBlock(0, false);
  }, [isActive]);

  const sentenceItems = sentences.map((inline) => {
    // Correct! Key should be specified inside the array.
    const sentenceId = `${id}-${inline.start}`;
    return (
      <SentenceItem
        key={sentenceId}
        id={sentenceId}
        sentenceActive={inline.sentenceActive}
        text={inline.text}
        start={inline.start}
        speak={speakTextBlock}
        presentationVue={presentationVue}
      />
    );
  });

  return (
    <>
      {mediaPermition ? (
        ""
      ) : (
        <p className="bg-red-500 text-sm bg-gray-800">
          Allow autoplay in browser setting, or click into text again
        </p>
      )}
      <p className={`relative ${isActive ? "active bg-gray-900" : "pasive"} `}>
        {sentenceItems}
      </p>
    </>
  );
};

export default TextElement;
