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
  //const [slides, setSlides] = useState([]);

  // PREPARE PRESENTATION
  // useEffect(() => {
  //   const titleSlide = content[0];
  //   const imageSlides = content.filter((element) => element.type === "image");
  //   console.log(imageSlides);

  //   // CREATE LINKS WITH SLIDE LOGIC

  //   const slides = [titleSlide, ...imageSlides].map((obj) => ({
  //     ...obj,
  //     blocks: [],
  //   }));

  //   let slideIndex = 0;
  //   let i;
  //   for (i = 0; i < content.length; i++) {
  //     if (content[i].type === "image") {
  //       slideIndex = slideIndex + 1;
  //     }
  //     slides[slideIndex].blocks.push(i);
  //   }

  //   setSlides(slides);
  // }, [content]);

  // const toggleReading = () => {
  //   const toggle = activeElement !== null ? null : 0;
  //   setActiveElement(toggle);
  // };

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
        {content.map((element, index) => (
          <Element
            isActive={activeElement === index}
            index={index}
            key={element.id}
            element={element}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            presentationView={presentationView}
          />
        ))}
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
