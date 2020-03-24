import React, { useEffect, useRef } from "react";

const scrollToRef = ref => {
  console.log(ref);
  //window.scrollTo(0, ref.current.offsetTop - 100);
  const position = "center";
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: position
  });
};

const ImageElement = ({ element, isActive, setActiveElement, index }) => {
  const myRef = useRef(null);

  const speakImageBlock = () => {
    console.log("set time out!");
    const timer = setTimeout(() => setActiveElement(index + 1), 3000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // On load of page run handleListNotes function
    if (isActive) speakImageBlock();
    if (isActive) scrollToRef(myRef);
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
        className={`block w-full ` + element.blockState}
      />
    </div>
  );
};

export default ImageElement;
