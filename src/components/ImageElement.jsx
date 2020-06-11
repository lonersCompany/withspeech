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
  activeElement,
  index,
  presentationVue,
}) => {
  const myRef = useRef(null);

  const speakImageBlock = () => {
    console.log("set time out!");
    setActiveElement(index);
    const timer = setTimeout(
      () => setActiveElement(index + 1),
      presentationVue ? 5000 : 3000
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
      className={` w-full h-full flex justify-center bg-gray-900 pb-10 ${
        isActive ? "active" : "pasive"
      } ${presentationVue ? "sticky top-0" : ""} ${
        activeElement ? "z-10" : ""
      }  `}
      contentEditable={false}
      onClick={speakImageBlock}
    >
      <img alt="" src={element.url} className={` max-h-screen `} />
    </div>
  );
};

export default ImageElement;
