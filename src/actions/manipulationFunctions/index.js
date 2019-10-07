export const getRitchBlocks = slateData => {
  const blocks = slateData.nodes.map((block, index) => {
    const textArrays = block.nodes.map(line => line.text);
    const text = textArrays.join(" ");
    //const count = text.length;
    //const src = undefined;
    const paragraf = index;
    const voice = "Salli";

    return { text, voice, paragraf };
  });

  return blocks;
};
// TODO: rebuild
export const getSentencesDigits = slateData => {
  const blocks = slateData.nodes.map(block => {
    const textArrays = block.nodes.map(line => line.text);
    const text = textArrays.join(" ");
    const sentencesArray = text.match(/[^.!?]+[.!?]|([^.!?]+$)+/g);
    const lengthArray = sentencesArray.map(sentence => sentence.length);
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

export const getAudioObjects = responseObjets => {
  return responseObjets.map(responseObj => {
    return {
      key: responseObj.body.audio.key,
      src: `https://text-with-speech.s3.eu-central-1.amazonaws.com/${responseObj.body.audio.key}`,
      paragraf: responseObj.body.audio.paragraf
    };
  });
};

export const removeEmptyStrings = document => {
  let { nodes } = document;
  nodes.forEach(node =>
    node.nodes.forEach(node => {
      if (node.text === "") {
        node.text = " ";
      }
    })
  );

  return nodes;
};

export const getAudioLinks = audioFiles =>
  audioFiles.map(file => {
    return { src: file.src };
  });
