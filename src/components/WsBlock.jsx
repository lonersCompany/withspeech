import React, { useState } from "react";

const WsBlock = ({ blovck }) => {
  function SentenceItem({ item }) {
    return (
      <span className={item.className} onClick={() => console.log(item.start)}>
        {item.value}{" "}
      </span>
    );
  }

  const [audioObject, setAudioObject] = useState();

  console.log(block);

  const newAudio = new Audio(block.link);
  setAudioObject(newAudio);

  const sentenceItems = block.blocks.map(block => (
    // Correct! Key should be specified inside the array.
    <SentenceItem key={block.value} item={block} />
  ));

  return <p>{sentenceItems}</p>;
};
export default WsPreview;
