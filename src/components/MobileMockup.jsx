import React, { useState } from "react";
import WsPreview from "./WsPreview";

import { previewData } from "../actions/data/data";

const MobileMockup = () => {
  const [content, setContent] = useState(previewData);
  return (
    <div className="m-auto max-w-lg mb-20 mobile-mockup ">
      <div className="h-10"></div>
      <div className="p-12 text-2xl">
        <button className="text-gray-800 py-2 px-4 border border-gray-400 rounded shadow">
          Play
        </button>
        <WsPreview content={content} />
      </div>
    </div>
  );
};

export default MobileMockup;
