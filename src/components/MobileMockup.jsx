import React, { useState } from "react";
import WsPreview from "./WsPreview";

import { previewData } from "../actions/data/data";

const MobileMockup = () => {
  const [content, setContent] = useState(previewData);
  const [isReading, setReading] = useState(null);

  const toggleReading = () => {
    const toggleReading = isReading === null ? 0 : null;
    setReading(toggleReading);
  };

  return (
    <div className="m-auto max-w-lg mobile-mockup bg-gray-900 ">
      <div className="h-10"></div>
      <div className="p-12 text-2xl article">
        <div className={isReading === null ? "" : "opacity-25"}>
          <button
            onClick={toggleReading}
            className="bg-blue-500 hover:bg-blue-400 px-4 rounded-lg mb-10"
          >
            Click into text to {isReading === null ? "start" : "stop"}
          </button>
        </div>
        <WsPreview content={content} isReading={isReading} />
      </div>
    </div>
  );
};

export default MobileMockup;
