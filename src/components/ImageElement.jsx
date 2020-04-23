import React, { useEffect, useRef } from "react";

const scrollToRef = (ref, presentationVue) => {
  const position = presentationVue ? "end" : "center";
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: position,
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
      className={`mb-10 speakable ${isActive ? "active" : "pasive"}`}
      contentEditable={false}
      onClick={speakImageBlock}
    >
      <img
        alt=""
        src={element.url}
        className={`${presentationVue ? "w-40" : " max-h-screen"} `}
      />
    </div>
  );
};

export default ImageElement;
