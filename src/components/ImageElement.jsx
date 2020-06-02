import React, { useEffect, useRef } from "react";

const scrollToRef = (ref, presentationVue) => {
  const block = presentationVue ? "start" : "center";
  const behavior = presentationVue ? "auto" : "smooth";
  ref.current.scrollIntoView({
    behavior,
    block,
  });
};

const ImageElement = ({
  element,
  isActive,
  setActiveElement,
  index,
  presentationVue,
}) => {
  const myRef = useRef(null);

  const speakImageBlock = () => {
    console.log("set time out!");
    setActiveElement(index);
    const timer = setTimeout(
      () => setActiveElement(index + 1),
      presentationVue ? 1000 : 3000
    );
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // On load of page run handleListNotes function
    if (isActive) speakImageBlock();
    if (isActive) scrollToRef(myRef, presentationVue);
  }, [isActive]);

  return (
    <div
      ref={myRef}
      className={`${isActive ? "active" : "pasive"} ${
        presentationVue
          ? "mb-32 sticky w-full top-0  h-full flex justify-center bg-gray-900"
          : "mb-8"
      }`}
      contentEditable={false}
      onClick={speakImageBlock}
    >
      <img alt="" src={element.url} className={` max-h-screen `} />
    </div>
  );
};

export default ImageElement;
