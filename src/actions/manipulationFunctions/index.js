import uuidv1 from "uuid/v1";
const smd = require("speechmarkdown-js");

// Conver Editor to content Value
export const getSSMLTextValue = (sentences, defaultVoice) => {
  const speech = new smd.SpeechMarkdown();

  //console.log(sentences);
  let paragrafTextValue = sentences.map((sentence) => sentence.text).join("");

  // CHANGE VOICE HACKING
  let voice = defaultVoice;

  if (paragrafTextValue.substring(0, 2) === "--") {
    const textShortCut = paragrafTextValue.substring(2, 4);
    paragrafTextValue = paragrafTextValue.substring(4);

    const voices = [
      "Salli",
      "Joanna",
      "Ivy",
      "Kendra",
      "Kimberly",
      "Matthew",
      "Justin",
      "Joey",
    ];

    voices.forEach((voiceName) => {
      const shortCut = voiceName.substring(0, 2);

      if (textShortCut === shortCut) {
        voice = voiceName;
        console.log("TRUEEEE");
      }
    });
  }

  const paragrafWithBreak = `${paragrafTextValue} [250ms]`;

  const ssmlValue = speech.toSSML(paragrafWithBreak, {
    platform: "amazon-alexa",
  });

  const pollyBlock = {
    text: ssmlValue,
    key: uuidv1(),
    voice: voice,
    ssml: true,
  };

  return pollyBlock;
};

export const getHtmlBlocks = (slateData) => {
  console.log(slateData);
  const blocks = slateData.nodes.map((block, index) => {
    const blockEl = document.createElement("div");
    block.nodes.forEach((lineNode) => {
      const spanEl = document.createElement("span");
      spanEl.innerText = lineNode.text;

      blockEl.appendChild(spanEl);
    });
    return blockEl;
  });

  return blocks;
};

export const getRitchBlocks = (slateData) => {
  const blocks = slateData.nodes.map((block, index) => {
    const textArrays = block.nodes.map((line) => line.text);
    const text = textArrays.join(" ");
    //const count = text.length;
    //const src = undefined;
    const key = "test-ksnbs7262HS-" + index;
    const voice = "Salli";

    return { text, voice, key };
  });

  return blocks;
};
// TODO: rebuild
export const getSentencesDigits = (slateData) => {
  const blocks = slateData.nodes.map((block) => {
    const textArrays = block.nodes.map((line) => line.text);
    const text = textArrays.join(" ");
    const sentencesArray = text.match(/[^.!?]+[.!?]|([^.!?]+$)+/g);
    const lengthArray = sentencesArray.map((sentence) => sentence.length);
    let count = 0;
    let newArray = [];
    let i = 0;
    for (i = 0; i < lengthArray.length; i++) {
      const pair = [count];
      count = count + lengthArray[i];
      pair.push(count);
      newArray.push(pair);
    }

    return newArray;
  });

  return blocks;
};

export const getAudioObjects = (responseObjets) => {
  return responseObjets.map((responseObj) => {
    return {
      key: responseObj.body.audio.key,
      src: `https://text-with-speech.s3.eu-central-1.amazonaws.com/${responseObj.body.audio.key}`,
      paragraf: responseObj.body.audio.paragraf,
    };
  });
};

export const removeEmptyStrings = (document) => {
  let { nodes } = document;
  nodes.forEach((node) =>
    node.nodes.forEach((node) => {
      if (node.text === "") {
        node.text = " ";
      }
    })
  );

  return nodes;
};

export const getAudioLinks = (audioFiles) =>
  audioFiles.map((file) => {
    return { src: file.src };
  });

export const cutToSentences = (string) => {
  const sentencesArray = string.match(/[^\.!\?]+[\.!\?]|([^\.!\?]+$)+/g);

  const spanElements = sentencesArray.map((sentence) => {
    const newEl = document.createElement("span");
    newEl.classList.add("s");
    newEl.setAttribute("data-state", "pasive");
    newEl.innerText = sentence;
    return newEl;
  });

  return spanElements;
};
