import React from "react";

const ImageElement = ({ element }) => {
  return (
    <div contentEditable={false}>
      <img src={element.url} className={`block w-full`} />
    </div>
  );
};

export default ImageElement;
