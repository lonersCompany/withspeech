import React, { useState } from "react";
import { useCountRenders } from "./useCountRenders";

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

const TextElement = ({ element, speak }) => {
  useCountRenders();
  const [mediaPermition, setMediaPermition] = useState(true);
  const [sentences, setSentences] = useState(
    element.children ? element.children : [{ value: "Error" }]
  );

  const playAudioObject = async audioObject => {
    try {
      await audioObject.play();
      setMediaPermition(true);
      return true;
    } catch (err) {
      setMediaPermition(false);
      return false;
    }
  };

  // const speakTextElement = ({ blockState, audioObject, index }) => {
  //   switch (blockState) {
  //     case "pasive":
  //       audioObject.pause();
  //       audioObject.currentTime = 0;
  //       break;
  //     case "active":
  //       console.log("Play");
  //       playAudioObject(audioObject);
  //       audioObject.addEventListener("timeupdate", function(e) {
  //         const currentTime = e.target.currentTime * 1000;
  //         const newSentences = sentences.map(item => {
  //           item.className =
  //             blockState === "active" &&
  //             currentTime >= item.start &&
  //             currentTime < item.end
  //               ? "active"
  //               : "pasive";

  //           return item;
  //         });

  //         setSentences(newSentences);
  //       });

  //       // add ended event listener
  //       audioObject.addEventListener("ended", () => {
  //         speak(index + 1, 0);
  //       });
  //       break;
  //   }
  // };

  // useEffect(() => {
  //   speakTextElement(element);
  // }, [element, element.blockState]);

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
    <>
      {mediaPermition ? (
        ""
      ) : (
        <p class="bg-red-500 text-sm">
          Allow autoplay in browser setting, or click into text again
        </p>
      )}
      <p className={element.blockState}>{sentenceItems}</p>
    </>
  );
};

export default TextElement;
