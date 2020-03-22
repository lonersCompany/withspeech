import React, { useEffect } from "react";

const ImageElement = ({ element, isActive, setActiveElement, index }) => {
  const speakImageBlock = () => {
    console.log("set time out!");
    const timer = setTimeout(() => setActiveElement(index + 1), 1000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // On load of page run handleListNotes function
    if (isActive) speakImageBlock();
  }, [isActive]);

  return (
    <p className={isActive ? "active" : "pasive"}>
      <div contentEditable={false} onClick={speakImageBlock}>
        <img
          alt=""
          src={element.url}
          className={`block w-full ` + element.blockState}
        />
      </div>
    </p>
  );
};

export default ImageElement;
