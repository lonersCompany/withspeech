import React, { useState, useEffect } from "react";

function SentenceItem({ text, start, className, blockIndex, speak }) {
  return (
    <>
      <span
        onClick={() => speak(blockIndex, start, className)}
        className={"speakable " + className}
      >
        {text}
      </span>{" "}
    </>
  );
}

const PlayButton = ({ speak, blockIndex }) => {
  const clickPlayButton = params => {
    speak(blockIndex, 0);
  };
  return <button onClick={clickPlayButton}>></button>;
};

const TextElement = ({ element, speak }) => {
  const [mediaPermition, setMediaPermition] = useState(true);
  const [sentences, setSentences] = useState(
    element.children ? element.children : [{ value: "Error" }]
  );

  useEffect(() => {
    // On load of page run handleListNotes function

    switch (element.blockState) {
      case "pasive":
        // element.audioObject.removeEventListener("timeupdate", () => {
        //   console.log("remove timeupdate");
        // });

        // element.audioObject.removeEventListener("ended", () => {
        //   console.log("ended");
        // });

        element.audioObject.pause();
        element.audioObject.currentTime = 0;

        break;
      case "active":
        const playAudioObject = async () => {
          try {
            const playEvent = await element.audioObject.play();
            setMediaPermition(true);
            return true;
          } catch (err) {
            setMediaPermition(false);
            return false;
          }
        };
        const playAwait = playAudioObject();

        element.audioObject.addEventListener("timeupdate", function(e) {
          const currentTime = e.target.currentTime * 1000;
          const newSentences = sentences.map(item => {
            item.className =
              element.blockState === "active" &&
              currentTime >= item.start &&
              currentTime < item.end
                ? "active"
                : "pasive";

            return item;
          });

          setSentences(newSentences);
        });

        // add ended event listener
        element.audioObject.addEventListener("ended", () => {
          speak(element.index + 1, 0);
        });

        return () =>
          element.audioObject.removeEventListener("timeupdate", () => {
            console.log("HEJ REMOVE!");
          });

        break;
    }
  }, [element.blockState]);

  const sentenceItems = sentences.map(block => {
    // Correct! Key should be specified inside the array.
    const sentenceId = `${element.index}-${block.start}`;

    return (
      <SentenceItem
        key={sentenceId}
        id={sentenceId}
        blockIndex={element.index}
        text={block.text}
        start={block.start}
        speak={speak}
        className={block.className}
      />
    );
  });

  return <p className={element.blockState}>{sentenceItems}</p>;
};

export default TextElement;
