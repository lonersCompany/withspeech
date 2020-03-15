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
  const [mediaPermition, setMediaPermition] = useState(false);
  const [sentences, setSentences] = useState(
    element.children ? element.children : [{ value: "Error" }]
  );

  useEffect(() => {
    // On load of page run handleListNotes function

    switch (element.blockState) {
      case "pasive":
        element.audioObject.removeEventListener("timeupdate", () => {
          console.log("remove timeupdate");
        });

        element.audioObject.removeEventListener("ended", () => {
          console.log("ended");
        });
        element.audioObject.pause();
        element.audioObject.currentTime = 0;

        const newSentences = sentences.map(item => {
          item.className = "pasive";
          return item;
        });

        setSentences(newSentences);
        break;
      case "active":
        const playAudioObject = async audioObject => {
          try {
            const playEvent = await element.audioObject.play();
            setMediaPermition(true);
          } catch (err) {
            setMediaPermition(false);
          }
        };
        const play = playAudioObject(element.audioObject);

        element.audioObject.addEventListener("timeupdate", function(e) {
          console.log("timeupdate");
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

  return (
    <p className={element.blockState}>
      {mediaPermition ? (
        ""
      ) : (
        <PlayButton speak={speak} blockIndex={element.index} />
      )}{" "}
      {sentenceItems}
    </p>
  );
};

export default TextElement;
