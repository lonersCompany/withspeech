import { API, graphqlOperation } from "aws-amplify";
import {
  getDocumentItem,
  generateAudio,
  deleteAudioFile
} from "../../graphql/queries";
import {
  updateDocumentItem,
  updateDocumentAudioLinks,
  deleteDocumentItem
} from "../../graphql/mutations";

export const readWsFile = async id => {
  try {
    const { data } = await API.graphql(
      graphqlOperation(getDocumentItem, { id })
    );

    return {
      responseDocumentObject: data.getDocumentItem.document,
      responseAudioObject: data.getDocumentItem.audioFiles
    };
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
    console.log(audioFiles);
    await Promise.all(
      audioFiles.map(file =>
        API.graphql(graphqlOperation(deleteAudioFile, { key: file.key }))
      )
    );
  }
};

export const handleDeleteAudioFile = async key => {
  await API.graphql(graphqlOperation(deleteAudioFile, { key }));
};

export const callGenerativeLambda = async ritchBlock => {
  const buffer = await API.graphql(graphqlOperation(generateAudio, ritchBlock));
  const response = JSON.parse(buffer.data.generateAudio);

  return { key: response.body.audio.key };
};

export const saveAudioObjects = async payload => {
  try {
    const { data } = await API.graphql(
      graphqlOperation(updateDocumentAudioLinks, { input: payload })
    );
    return data;
  } catch (err) {
    return err;
  }
};

export const saveWsFile = async input => {
  try {
    const { data } = await API.graphql(
      graphqlOperation(updateDocumentItem, { input })
    );
    console.log(data.updateDocumentItem);
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
