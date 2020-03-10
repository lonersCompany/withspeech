import React, { useState, useEffect } from "react";

function SentenceItem({ item, blockIndex, speak }) {
  return (
    <span
      onClick={() => speak(blockIndex, item.start)}
      className={"speakable " + item.className}
    >
      {item.text}
    </span>
  );
}

const ImageElement = ({ element }) => {
  return (
    <div contentEditable={false}>
      <img src={element.url} className={`block w-full`} />
    </div>
  );
};

// TODO: audioObject is for every paragraf?
function TextBlock({ element, speak, index }) {
  const [activeSentence, setActiveSentence] = useState({});
  const [sentences, setSentences] = useState(
    element.children ? element.children : [{ value: "Error" }]
  );

  const blockIndex = index;

  // useEffect(() => {
  //   // On load of page run handleListNotes function
  //   console.log("object2");
  //   element.audioObject.addEventListener("timeupdate", function(e) {
  //     const currentTime = e.target.currentTime * 1000;
  //     const newSentences = sentences.map(item => {
  //       if (currentTime >= item.start && currentTime < item.end) {
  //         item.className = "active";
  //         setActiveSentence(item);
  //         return item;
  //       } else {
  //         item.className = "pasive";
  //         return item;
  //       }
  //     });

  //     setSentences(newSentences);
  //   });
  // }, [element]);

  const sentenceItems = sentences.map((block, index) => (
    // Correct! Key should be specified inside the array.
    <SentenceItem
      key={index}
      item={block}
      speak={speak}
      blockIndex={blockIndex}
    />
  ));

  return <p>{sentenceItems}</p>;
}

const Element = ({ element, speak, index }) => {
  switch (element.type) {
    case "image":
      return <ImageElement element={element} index={index} speak={speak} />;
    default:
      return <TextBlock element={element} index={index} speak={speak} />;
  }
};

function Content({ content }) {
  const [isSpeaking, setSpeaking] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [activeTime, setActiveTime] = useState();
  const [audioObject, setAudioObject] = useState();
  const [audioObjects, setAudioObjects] = useState([]);

  const speak = (index, time) => {
    console.log(audioObjects);

    // if (activeIndex === index && activeTime === time) {
    //   audioObject.pause();
    // } else {
    //   audioObjects[index].currentTime = time;

    //   audioObjects[index].play();
    // }
  };

  useEffect(() => {
    const initAudioObjects = content.map((item, index) => {
      const { url } = content[index];
      const newAudio = new Audio(url);
      newAudio.addEventListener("ended", () => {
        const nextIndex = index + 1;
        speak(nextIndex, 0);
      });
      return newAudio;
    });
    console.log(initAudioObjects);
    setAudioObjects(initAudioObjects);
  }, [content]);

  const contentItems = content.map((element, index) => (
    // Correct! Key should be specified inside the array.
    <Element key={element.id} index={index} element={element} speak={speak} />
  ));
  return (
    <div className={isSpeaking ? "speaking" : "not-speaking"}>
      {contentItems}
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
