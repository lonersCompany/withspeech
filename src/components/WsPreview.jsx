import React, { useState } from "react";

import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

// TODO: audioObject is for every paragraf?

const Element = ({ element, setActiveElement, index, isActive }) => {
  switch (element.type) {
    case "image":
      return (
        <ImageElement
          element={element}
          isActive={isActive}
          index={index}
          setActiveElement={setActiveElement}
        />
      );
    case "paragraph":
      return (
        <TextElement
          id={element.id}
          children={element.children}
          url={element.url}
          index={index}
          isActive={isActive}
          setActiveElement={setActiveElement}
        />
      );
    default:
      return <div>Loading</div>;
  }
};

function Content({ content }) {
  const [activeElement, setActiveElement] = useState(null);

  const startReading = params => {
    if (activeElement === null) {
      setActiveElement(0);
    } else {
      setActiveElement(null);
    }
  };

  return (
    <div className={activeElement === null ? "not-speaking" : "speaking"}>
      <div>
        <button
          onClick={startReading}
          className="bg-blue-700 hover:bg-blue-600 px-4 rounded-lg mb-10 "
        >
          Click into text to {activeElement === null ? "start" : "pause"}
        </button>
      </div>
      {content.map((element, index) => (
        <Element
          isActive={activeElement === index}
          index={index}
          key={element.id}
          element={element}
          setActiveElement={setActiveElement}
        />
      ))}
    </div>
  );
}

const WsPreview = ({ content }) => {
  return (
    <div>{content ? <Content content={content} /> : "Generate content"}</div>
  );
};
export default WsPreview;
