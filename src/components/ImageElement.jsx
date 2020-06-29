import React, { useEffect, useRef, useCallback } from "react";

const scrollToRef = (ref, presentationView) => {
  const block = presentationView ? "start" : "center";
  const behavior = presentationView ? "auto" : "smooth";
  ref.current.scrollIntoView({
    behavior,
    block,
  });
};

const ImageElement = ({
  element,
  isActive,
  setActiveElement,
  activeElement,
  index,
  presentationView,
}) => {
  const myRef = useRef(null);

  const ImageTimig = presentationView ? 2000 : 3000;

  const speakImageBlock = useCallback(async () => {
    setActiveElement(index);
    scrollToRef(myRef, presentationView);
    const nextIndex = index + 1;
    const timer = setTimeout(() => setActiveElement(nextIndex), ImageTimig);

    return () => clearTimeout(timer);
  }, [ImageTimig, index, presentationView, setActiveElement]);

  useEffect(() => {
    // On load of page run handleListNotes function
    if (isActive) speakImageBlock();
  }, [isActive, speakImageBlock]);

  return (
    <div
      ref={myRef}
      className={` w-full h-full flex justify-center bg-gray-900 pb-10 ${
        isActive ? "active" : "pasive"
      } ${presentationView ? "sticky top-0" : ""} ${
        activeElement ? "z-10" : ""
      }  `}
      contentEditable={false}
      onClick={speakImageBlock}
    >
      <img alt="" src={element.url} className={`h-auto max-h-screen `} />
    </div>
  );
};

export default ImageElement;
