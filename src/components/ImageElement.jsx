import React, { useEffect, useRef, useCallback } from "react";

// const scrollToRef = (ref, position) => {
//   ref.current.scrollIntoView({
//     behavior: "smooth",
//     block: position,
//   });
// };

const ImageElement = ({
  element,
  isActive,
  setActiveElement,
  activeElement,
  index,
  presentationView,
}) => {
  const imgRef = useRef(null);

  const ImageTimig = presentationView ? 500 : 100;

  const speakImageBlock = useCallback(async () => {
    console.log(presentationView);
    setActiveElement(index);
    const nextIndex = index + 1;
    const timer = setTimeout(() => setActiveElement(nextIndex), ImageTimig);

    return () => clearTimeout(timer);
  }, [ImageTimig, index, presentationView, setActiveElement]);

  useEffect(() => {
    if (isActive) {
      console.log(presentationView ? "start" : "center");
      console.log("scrollIntoView " + presentationView);
      imgRef.current.scrollIntoView({
        behavior: presentationView ? "auto" : "smooth",
        block: presentationView ? "start" : "center",
      });

      const timer = setTimeout(
        () => setActiveElement(index + 1),
        presentationView ? 1000 : 3000
      );
      return () => clearTimeout(timer);
    }
  }, [isActive, presentationView, index, setActiveElement]);

  return (
    <div
      className={` w-full h-full text-center pb-10 ${
        isActive ? "active" : "pasive"
      } ${presentationView ? "sticky top-0 z-10" : ""}`}
      contentEditable={false}
      onClick={speakImageBlock}
    >
      <img
        ref={imgRef}
        alt=""
        src={element.url}
        className={`h-auto max-h-screen m-auto`}
      />
    </div>
  );
};

export default ImageElement;
