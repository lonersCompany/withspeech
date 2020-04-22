import React, { useState, useEffect } from "react";

import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

const Slide = ({ element, active }) => {
  console.log(element);
  return (
    <div
      className={`w-full h-full top-0 bg-blue-900 flex justify-center ${
        active ? "absolute" : "hidden"
      }`}
    >
      {element.type === "image" ? (
        <img
          className="block max-w-full h-full mx-auto self-center"
          src={element.url}
          alt="we need to do alts"
        />
      ) : (
        <div className="flex justify-center self-center">
          <h1 className=" ">{element.children[0].text}</h1>
        </div>
      )}
    </div>
  );
};

// TODO: audioObject is for every paragraf?
const Element = ({
  element,
  setActiveElement,
  index,
  isActive,
  presentationVue,
}) => {
  switch (element.type) {
    case "image":
      return (
        <ImageElement
          element={element}
          isActive={isActive}
          index={index}
          setActiveElement={setActiveElement}
          presentationVue={presentationVue}
        />
      );
    case "paragraph":
      return (
        <TextElement
          element={element}
          index={index}
          isActive={isActive}
          setActiveElement={setActiveElement}
          presentationVue={presentationVue}
        />
      );
    default:
      return <div>Loading</div>;
  }
};

function Content({ content, presentationVue }) {
  const [activeElement, setActiveElement] = useState(null);
  const [slides, setSlides] = useState([]);

  // PREPARE PRESENTATION
  useEffect(() => {
    const titleSlide = content[0];
    const imageSlides = content.filter((element) => element.type === "image");
    console.log(imageSlides);

    // CREATE LINKS WITH SLIDE LOGIC

    const slides = [titleSlide, ...imageSlides].map((obj) => ({
      ...obj,
      blocks: [],
    }));

    console.log(slides);

    let slideIndex = 0;
    let i;
    for (i = 0; i < content.length; i++) {
      if (content[i].type === "image") {
        slideIndex = slideIndex + 1;
      }
      slides[slideIndex].blocks.push(i);
    }

    setSlides(slides);
  }, [content]);

  const toggleReading = () => {
    const toggle = activeElement !== null ? null : 0;
    setActiveElement(toggle);
  };

  return (
    <>
      <div>
        <button
          onClick={toggleReading}
          className="px-4 rounded-lg mb-10 text-blue-500 border border-blue-500 rounded"
        >
          Click into text to {activeElement === null ? "start" : "stop"} reading
        </button>
      </div>
      <div
        className={`${activeElement === null ? "not-speaking" : "speaking"} ${
          presentationVue ? "mt-70" : ""
        }`}
      >
        {content.map((element, index) => (
          <Element
            isActive={activeElement === index}
            index={index}
            key={element.id}
            element={element}
            setActiveElement={setActiveElement}
            presentationVue={presentationVue}
          />
        ))}
      </div>

      {presentationVue ? (
        <div className="fixed top-0 right-0 lg:w-3/4 xl:w-4/5 h-70 bg-blue-900">
          {slides.map((element, index) => {
            const active = activeElement
              ? element.blocks.includes(activeElement)
              : index === 0;
            return <Slide key={element.id} element={element} active={active} />;
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const WsPreview = ({ content, presentationVue }) => {
  return (
    <div>
      {content && content.length !== 0 ? (
        <Content content={content} presentationVue={presentationVue} />
      ) : (
        "..."
      )}
    </div>
  );
};
export default WsPreview;
