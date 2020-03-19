import { API, graphqlOperation } from "aws-amplify";
import {
  getDocumentItem,
  generateAudio,
  deleteAudioFile,
  generateSubtitles
} from "../../graphql/queries";
import {
  createDocumentItem,
  updateDocumentItem,
  deleteDocumentItem
} from "../../graphql/mutations";

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const createWsFile = async () => {
  const input = {
    id: generateUUID()
  };

  try {
    const { data } = await API.graphql(
      graphqlOperation(createDocumentItem, { input })
    );

    const response = data.createDocumentItem;

    console.log(data);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const downLoadWsFile = async id => {
  try {
    const { data } = await API.graphql(
      graphqlOperation(getDocumentItem, { id })
    );
    return data.getDocumentItem;
  } catch (err) {
    console.log(err);
  }
};

export const uploadWsFile = async input => {
  try {
    const { data } = await API.graphql(
      graphqlOperation(updateDocumentItem, { input })
    );

    const response = data.updateDocumentItem;

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteWsFile = async id => {
  const payload = { id };
  const { data } = await API.graphql(
    graphqlOperation(deleteDocumentItem, { input: payload })
  );
  const { audioFiles } = data.deleteDocumentItem;
  if (audioFiles) {
    // TODO: Check ID
    await Promise.all(
      audioFiles.map(file =>
        API.graphql(graphqlOperation(deleteAudioFile, { key: file.key }))
      )
    );
  }
};

export const triggerDeleteAudioBlock = async key => {
  await API.graphql(graphqlOperation(deleteAudioFile, { key }));
};

export const triggerGenAudioBlock = async block => {
  try {
    const buffer = await API.graphql(graphqlOperation(generateAudio, block));
    const response = JSON.parse(buffer.data.generateAudio);

    return response.body.audio.key;
  } catch (err) {
    console.log(err);
  }
};

// function isInt(value) {
//   return (
//     !isNaN(value) &&
//     (function(x) {
//       return (x | 0) === x;
//     })(parseFloat(value))
//   );
// }

const renameObjFiled = (obj, old_key, new_key) => {
  if (old_key !== new_key) {
    Object.defineProperty(
      obj,
      new_key,
      Object.getOwnPropertyDescriptor(obj, old_key)
    );
    delete obj[old_key];
  }
  return obj;
};

export const triggerGenSubtitleBlock = async block => {
  try {
    const responseJson = await API.graphql(
      graphqlOperation(generateSubtitles, block)
    );
    // Create JS object from JSON
    const { body } = JSON.parse(responseJson.data.generateSubtitles);
    const returnedStream = body.stream;

    const children = returnedStream.map(obj =>
      renameObjFiled(obj, "value", "text")
    );

    return children;
  } catch (err) {
    console.log(err);
  }
};

export const saveWsFile = async input => {
  try {
    const { data } = await API.graphql(
      graphqlOperation(updateDocumentItem, { input })
    );
    return data.updateDocumentItem;
  } catch (err) {
    console.log(err);
  }
};

// export const handleAudioGen = async store => {
//   const { document } = thisValue.toJSON();
//   const { id } = store.state;
//   const textBlocks = GetBlockText(id, document);

//   const responseArray = await Promise.all(
//     textBlocks.map(block => API.graphql(graphqlOperation(generateAudio, block)))
//   );

//   const dataArray = responseArray.map(response =>
//     JSON.parse(response.data.generateAudio)
//   );

//   // Transform key to src
//   const audioFiles = dataArray.map(data => {
//     return {
//       key: data.body.audio.key,
//       src: `https://text-with-speech.s3.eu-central-1.amazonaws.com/${data.body.audio.key}`,
//       paragraf: data.body.audio.paragraf
//     };
//   });
//   console.log(audioFiles);

//   const status = audioFiles.length > 0 ? "SUCCESS" : "NULL";
//   store.setState({ audioFiles, status });

//   // SAVE GENERATED PATHS TO DB
//   const payload = {
//     id,
//     audioFiles
//   };

//   saveAudio(payload);
// };
