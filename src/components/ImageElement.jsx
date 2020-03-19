import React from "react";

const ImageElement = ({ element, speak }) => {
  const { index } = element;

  const imageClick = params => {
    speak(index, null);
  };

  // useEffect(() => {
  //   // On load of page run handleListNotes function

  //   switch (element.blockState) {
  //     case "active":
  //       console.log("set time out!");
  //       const timer = setTimeout(() => speak(index + 1, 0), 2000);
  //       return () => clearTimeout(timer);
  //       break;
  //   }
  // }, [element.blockState]);

  return (
    <div contentEditable={false} onClick={imageClick}>
      <img
        alt=""
        src={element.url}
        className={`block w-full ` + element.blockState}
      />
    </div>
  );
};

export default ImageElement;
