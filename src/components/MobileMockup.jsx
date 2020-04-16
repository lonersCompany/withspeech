import React, { useEffect, useState } from "react";
import WsPreview from "./WsPreview";

import { downLoadWsFile } from "../actions/fetchFunctions";

const MobileMockup = () => {
  const [id] = useState("aef74e5-6c41-4b51-bb9f-4edcc70ea346");
  const [setName] = useState();
  const [content, setContent] = useState([]);
  const [setTextValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Add your text" }],
    },
  ]);
  const [setEditor] = useState(false);
  const [setAudioSync] = useState(false);
  const [isReading, setReading] = useState(null);
  const [setVoice] = useState("Salli");

  const toggleReading = () => {
    const toggleReading = isReading === null ? 0 : null;
    setReading(toggleReading);
  };

  useEffect(() => {
    const renderWSFile = async () => {
      try {
        const { name, content, voice } = await downLoadWsFile(id);

        // LOAD TEXT WITH SPEECH DOCUMENT
        if (name) setName(name);
        if (voice) setVoice(voice);

        if (content === null) setEditor(true);
        if (content) setContent(content);
        if (content) setTextValue(content);
        if (content) setAudioSync(true);
      } catch (err) {
        console.error(err);
      }
    };

    renderWSFile();
  }, [id]);

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
