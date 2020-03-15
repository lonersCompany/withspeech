import React, { useState, useEffect } from "react";

import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

// TODO: audioObject is for every paragraf?

const Element = ({ element, speak }) => {
  switch (element.type) {
    case "image":
      return <ImageElement element={element} speak={speak} />;
    default:
      return <TextElement element={element} speak={speak} />;
  }
};

function Content({ content }) {
  const [audioObjects, setAudioObjects] = useState([]);
  const [isSpeaking, setSpeaking] = useState(false);

  const speak = (index, time, blockState) => {
    if (index === audioObjects.length) return;

    const sTime = time * 0.001;
    let newAudioObjects = [...audioObjects];
    // Set Block state
    switch (blockState) {
      case "active":
        newAudioObjects[index].audioObject.pause();
        newAudioObjects[index].blockState = "pasive";
        setSpeaking(false);
        break;
      default:
        newAudioObjects.map(obj => {
          obj.blockState = "pasive";
          return obj;
        });
        newAudioObjects[index].blockState = "active";
        newAudioObjects[index].audioObject.currentTime = sTime;
        setSpeaking(true);
    }

    setAudioObjects(newAudioObjects);
  };

  useEffect(() => {
    const initAudioObjects = content.map((item, index) => {
      const copy = Object.assign({}, item);

      const { url } = content[index];
      const newAudio = new Audio(url);
      copy.audioObject = newAudio;
      copy.blockState = "pasive";
      copy.index = index;
      return copy;
    });

    setAudioObjects(initAudioObjects);
  }, [content]);

  return (
    <div className={isSpeaking ? "speaking" : "not-speaking"}>
      {audioObjects.map(element => (
        // Correct! Key should be specified inside the array.
        <Element key={element.id} element={element} speak={speak} />
      ))}
    </div>
  );
}

const WsPreview = ({ document }) => {
  const { content } = document;
  return (
    <div>{content ? <Content content={content} /> : "Generate content"}</div>
  );
};
export default WsPreview;
