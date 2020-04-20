import React, { useEffect, useState } from "react";
import WsPreview from "./WsPreview";

import { downLoadWsFile } from "../actions/fetchFunctions";

const mockupFile = {
  id: "8aef74e5-6c41-4b51-bb9f-4edcc70ea346",
  name: "You won’t believe my morning ",
  content: [
    {
      id: "85f34230-7f4e-11ea-b5ff-5f8340759b4d",
      type: "paragraph",
      url:
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/85f34230-7f4e-11ea-b5ff-5f8340759b4d",
      children: [
        { text: "You won’t believe my morning ", start: 0, end: 999999 },
      ],
    },
    {
      id: "85f3b760-7f4e-11ea-b5ff-5f8340759b4d",
      type: "paragraph",
      url:
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/85f3b760-7f4e-11ea-b5ff-5f8340759b4d",
      children: [
        {
          text:
            "I went out on my daily excursion to sit on the front step of my building for ten minutes holding my breath when people walked by. ",
          start: 0,
          end: 7368,
        },
        {
          text:
            "Normally, I spend the time diddling around my phone, but I forgot to bring my phone this morning, so I just looked around. ",
          start: 7368,
          end: 999999,
        },
      ],
    },
    {
      id: "85f40580-7f4e-11ea-b5ff-5f8340759b4d",
      type: "paragraph",
      url:
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/85f40580-7f4e-11ea-b5ff-5f8340759b4d",
      children: [
        {
          text:
            "As I was taking in the emptiness of the street, a little glint caught my eye in a patch of dirt on the sidewalk. ",
          start: 0,
          end: 6532,
        },
        {
          text: "I bent over to look closer, and there was the glint again. ",
          start: 6532,
          end: 10149,
        },
        {
          text:
            "It wasn’t a normal glint like from a shiny rock or a piece of metal—it was a little pinprick of flashing light. ",
          start: 10149,
          end: 999999,
        },
      ],
    },
    {
      id: "85f453a0-7f4e-11ea-b5ff-5f8340759b4d",
      type: "paragraph",
      url:
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/85f453a0-7f4e-11ea-b5ff-5f8340759b4d",
      children: [
        {
          text: "Intrigued, I was now on all fours looking closer. ",
          start: 0,
          end: 3690,
        },
        {
          text: "And I saw the most surreal thing. ",
          start: 3690,
          end: 999999,
        },
      ],
    },
    {
      id: "85f4efe0-7f4e-11ea-b5ff-5f8340759b4d",
      type: "paragraph",
      url:
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/85f4efe0-7f4e-11ea-b5ff-5f8340759b4d",
      children: [{ text: "Tiny houses. ", start: 0, end: 999999 }],
    },
    {
      id: "85f53e00-7f4e-11ea-b5ff-5f8340759b4d",
      type: "paragraph",
      url:
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/85f53e00-7f4e-11ea-b5ff-5f8340759b4d",
      children: [
        { text: "Like tiny houses. ", start: 0, end: 1731 },
        {
          text:
            "Each about a millimeter high, like ornately carved grains of sand. ",
          start: 1731,
          end: 999999,
        },
      ],
    },
    {
      id: "85f58c20-7f4e-11ea-b5ff-5f8340759b4d",
      type: "paragraph",
      url:
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/85f58c20-7f4e-11ea-b5ff-5f8340759b4d",
      children: [
        {
          text:
            "I was either dreaming or looking at the coolest, cutest little art project ever. ",
          start: 0,
          end: 999999,
        },
      ],
    },
    {
      id: "85f5b330-7f4e-11ea-b5ff-5f8340759b4d",
      type: "paragraph",
      url:
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/85f5b330-7f4e-11ea-b5ff-5f8340759b4d",
      children: [
        {
          text:
            "As I examined the microscopic village, I noticed what looked like a scrawl of teeny letters on the dirt next to the houses. ",
          start: 0,
          end: 7377,
        },
        { text: "It said: ", start: 7377, end: 999999 },
      ],
    },
  ],
  voice: "Salli",
  _version: 11,
  _deleted: null,
  _lastChangedAt: 1586978583279,
  owner: "a3b3bebd-f2d2-49f5-9a1e-2ad4e0325e94",
};
const MobileMockup = () => {
  const [id] = useState(mockupFile.id);

  const [content, setContent] = useState(mockupFile.content);
  const [isReading, setReading] = useState(null);
  const [setVoice] = useState("Salli");

  const toggleReading = () => {
    const toggleReading = isReading === null ? 0 : null;
    setReading(toggleReading);
  };

  // useEffect(() => {
  //   const renderWSFile = async () => {
  //     try {
  //       const { content, voice } = await downLoadWsFile(id);

  //       // LOAD TEXT WITH SPEECH DOCUMENT
  //       if (voice) setVoice(voice);
  //       if (content) setContent(content);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   renderWSFile();
  // }, [id]);

  return (
    <div className="m-auto max-w-lg mobile-mockup bg-gray-900 ">
      <div className="h-10"></div>
      <div className="p-12 text-2xl article">
        <WsPreview content={content} isReading={isReading} />
      </div>
    </div>
  );
};

export default MobileMockup;
