import React, { useState } from "react";
import WsPreview from "./WsPreview";

import { previewData } from "../actions/data/data";

const MobileMockup = () => {
  const [content, setContent] = useState(previewData);
  return (
    <div className="m-auto max-w-lg mobile-mockup ">
      <div className="h-10"></div>
      <div className="p-12 text-2xl">
        <WsPreview content={content} />
      </div>
    </div>
  );
};

export default MobileMockup;
