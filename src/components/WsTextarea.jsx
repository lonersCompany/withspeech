import React, { useState, useEffect } from "react";

// TODO: Play with tree structure and write article about it

const WsTextarea = ({ textValue, handleEditiorChange }) => {
  const handleTextChange = event => {
    const value = event.target.value;

    handleEditiorChange(value);
  };

  return (
    <textarea
      value={textValue}
      onChange={handleTextChange}
      className="border border-gray-300 w-full h-64 h-screen"
      maxLength="3000"
    ></textarea>
  );
};
export default WsTextarea;

// Text Area to sentences
// const textAreaToObject = value => {
//   var documentParagrafs = value.match(/[^\n\?]+[\n\?]|([^\n\?]+$)+/g);

//   if (documentParagrafs) {
//     const paragrafs = documentParagrafs.map(paragraf => {
//       const replacedN = paragraf.replace(/\n/g, "");
//       const inlineArray = cutToSentences(replacedN);
//       if (inlineArray) {
//         const inlineNode = inlineArray.map(inline => {
//           return {
//             text: inline,
//             key: uuidv1(),
//             voice: "Salli"
//           };
//         });

//         const document = {
//           object: "block",
//           type: "paragraf",
//           nodes: inlineNode
//         };

//         return document;
//       }
//     });

//     const document = {
//       nodes: paragrafs
//     };

//     handleEditiorChange(document);
//   }
// };
