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

  return (
    <div className={activeElement === null ? "not-speaking" : "speaking"}>
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
