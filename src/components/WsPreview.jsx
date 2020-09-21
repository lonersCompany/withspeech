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
    <div
      className={`pt-8 pb-64 ${
        activeElement === null ? "not-speaking" : "speaking"
      } ${presentationView ? "presentationView" : "articleView"} `}
    >
      <div
        className={`fixed px-5 z-50 right-0 ${
          activeElement === null ? "hidden" : ""
        } `}
      >
        <div className="self-center text-center h-16 w-16 bg-blue-900 shadow rounded-full transition">
          <div className="pt-2">
            <span role="img" aria-label="" description="Speaker Medium Volume">
              🔉
            </span>
          </div>
        </div>
      </div>
      <div className="mb-10 px-5">
        <span className="text-blue-700 text-md">
          Click into text to (play/stop) audio
        </span>
      </div>
      <div>{elements}</div>
    </div>
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
