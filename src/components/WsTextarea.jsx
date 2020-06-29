import React, { useState, useEffect } from "react";

// TODO: Play with tree structure and write article about it

const WsTextarea = ({ textValue, handleEditiorChange }) => {
  const handleTextChange = (event) => {
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
