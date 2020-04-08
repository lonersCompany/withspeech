import React, { useState, useEffect } from "react";

import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

const Slide = ({ element, active }) => {
  return (
    <div className={`w-full h-full top-0 ${active ? "absolute" : "hidden"}`}>
      {element.type === "image" ? (
        <img
          className="block max-w-full h-full mx-auto"
          src={element.url}
          alt="we need to do alts"
        />
      ) : (
        ""
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
  presentationVue
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

function Content({ content, presentationVue, isReading }) {
  const [activeElement, setActiveElement] = useState(null);
  const [slides, setSlides] = useState([]);

  // PREPARE PRESENTATION
  useEffect(() => {
    const titleSlide = content[0];
    const imageSlides = content.filter(element => element.type === "image");

    const slides = [titleSlide, ...imageSlides].map(obj => ({
      ...obj,
      blocks: []
    }));

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

  useEffect(() => {
    console.log(isReading);
    setActiveElement(isReading);
  }, [isReading]);

  return (
    <>
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
          <div className={`w-full h-full top-0 absolute flex justify-center`}>
            <div className="self-center text-center">
              <h1 className=" ">{content[0].children[0].text}</h1>
              <p className="text-gray-600">(Presentation Mode)</p>
            </div>
          </div>
          {slides.map(element => (
            <Slide
              key={element.id}
              element={element}
              active={element.blocks.includes(activeElement)}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const WsPreview = ({ content, presentationVue, isReading }) => {
  return (
    <div>
      {content && content.length != 0 ? (
        <Content
          content={content}
          presentationVue={presentationVue}
          isReading={isReading}
        />
      ) : (
        "Generate content"
      )}
    </div>
  );
};
export default WsPreview;
