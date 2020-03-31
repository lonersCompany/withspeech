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

function Content({ content, presentationVue }) {
  const [activeElement, setActiveElement] = useState(null);
  const [slides, setSlides] = useState([]);

  // PREPARE PRESENTATION
  useEffect(() => {
    const titleSlide = content[0];
    const imageSlides = content.filter(element => element.type === "image");

    const slides = [titleSlide, ...imageSlides];

    let slideIndex = 0;

    content.map((element, index) => {
      if (element.type === "image") {
        slideIndex = slideIndex + 1;
      }
      if (!slides[slideIndex].blocks) slides[slideIndex].blocks = [];
      slides[slideIndex].blocks.push(index);
    });

    console.log(slides);

    setSlides(slides);
  }, [content]);

  const startReading = () => {
    if (activeElement === null) {
      setActiveElement(0);
    } else {
      setActiveElement(null);
    }
  };

  return (
    <>
      <div
        className={`${activeElement === null ? "not-speaking" : "speaking"} ${
          presentationVue ? "mt-70" : ""
        }`}
      >
        <div>
          <button
            onClick={startReading}
            className="bg-blue-500 hover:bg-blue-400 px-4 rounded-lg mb-10"
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
              key={"slide-" + element.id}
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

const WsPreview = ({ content, presentationVue }) => {
  return (
    <div>
      {content.length != 0 ? (
        <Content content={content} presentationVue={presentationVue} />
      ) : (
        "Generate content"
      )}
    </div>
  );
};
export default WsPreview;
