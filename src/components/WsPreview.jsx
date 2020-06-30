import React, { useState } from "react";

import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

// TODO: audioObject is for every paragraf?
const Element = ({
  element,
  activeElement,
  setActiveElement,
  index,
  isActive,
  presentationView,
}) => {
  switch (element.type) {
    case "image":
      return (
        <ImageElement
          element={element}
          isActive={isActive}
          index={index}
          activeElement={activeElement}
          setActiveElement={setActiveElement}
          presentationView={presentationView}
        />
      );
    case "paragraph":
      return (
        <TextElement
          element={element}
          index={index}
          isActive={isActive}
          setActiveElement={setActiveElement}
          presentationView={presentationView}
        />
      );
    default:
      return <div>Loading</div>;
  }
};

function Content({ content, presentationView }) {
  const [activeElement, setActiveElement] = useState(null);

  const elements = content.map((element, index) => {
    const isActive = activeElement === index;
    return (
      <Element
        isActive={isActive}
        setActiveElement={setActiveElement}
        index={index}
        key={element.id}
        element={element}
        presentationView={presentationView}
      />
    );
  });

  return (
    <>
      <div className="mb-10">
        {/* <button
          onClick={toggleReading}
          className=" rounded-lg py-2 px-3 text-green-500 border-2 border-green-500 "
        >
          Play{" "}
          <span role="img" aria-label="play">
            🔉
          </span>
        </button>{" "} */}
        <span className="text-blue-700">
          Click into text to (play/stop) audio
        </span>
      </div>
      <div
        className={` ${activeElement === null ? "not-speaking" : "speaking"} `}
      >
        {elements}
      </div>
    </>
  );
}

const WsPreview = ({ content, presentationView, isLoading }) => {
  return (
    <div className={`${isLoading ? "opacity-50 pointer-events-none" : ""} `}>
      <Content content={content} presentationView={presentationView} />
    </div>
  );
};
export default WsPreview;
