import React, { useState, useEffect } from "react";

import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

// const Slide = ({ element, active }) => {
//   console.log(element);
//   return (
//     <div
//       className={`w-full h-full top-0 flex justify-center ${
//         active ? "" : "hidden"
//       }`}
//     >
//       {element.type === "image" ? (
//         <img
//           className="block max-w-full h-full mx-auto self-center"
//           src={element.url}
//           alt="we need to do alts"
//         />
//       ) : (
//         <div className="flex justify-center self-center">
//           <h1 className=" ">{element.children[0].text}</h1>
//         </div>
//       )}
//     </div>
//   );
// };

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
  const [slides, setSlides] = useState([]);

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

  const toggleReading = () => {
    const toggle = activeElement !== null ? null : 0;
    setActiveElement(toggle);
  };

  return (
    <>
      <div>
        <button
          onClick={toggleReading}
          className="px-4 rounded-lg mb-10 rounded border border-blue-500 focus:outline-none "
        >
          🔉
        </button>
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
