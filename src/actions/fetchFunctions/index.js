import { API, graphqlOperation } from "aws-amplify";
import {
  getDocumentItem,
  generateAudioFile,
  generateTimming,
  deleteAudioFile,
  listDocumentItems,
} from "../../graphql/queries";
import {
  createDocumentItem,
  updateDocumentItem,
  deleteDocumentItem,
} from "../../graphql/mutations";

// const renameObjFiled = (obj, old_key, new_key) => {
//   if (old_key !== new_key) {
//     Object.defineProperty(
//       obj,
//       new_key,
//       Object.getOwnPropertyDescriptor(obj, old_key)
//     );
//     delete obj[old_key];
//   }
//   return obj;
// };

export const createWsFile = async () => {
  const input = {
    name: "Audio article without Name",
    _version: 0,
  };

  try {
    const { data } = await API.graphql(
      graphqlOperation(createDocumentItem, { input })
    );

    const response = data.createDocumentItem;

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const downLoadWsFile = async (id) => {
  try {
    const { data } = await API.graphql({
      query: getDocumentItem,
      variables: { id },
      authMode: "AWS_IAM",
    });

    return data.getDocumentItem;
  } catch (err) {
    console.log(err);
  }
};

export const handleListWsFiles = async () => {
  // Use aplify api graphql method to request graphql queries
  // that we improt by name "listNotes"
  try {
    const { data } = await API.graphql({
      query: listDocumentItems,
      variables: { limit: 50 },
      authMode: "AWS_IAM",
    });
    const { items } = data.listDocumentItems;
    console.log(data);
    return items;
  } catch (err) {
    console.log(err);
  }
};

export const uploadWsFile = async (input) => {
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

export const deleteWsFile = async (id) => {
  const payload = { id };
  const { data } = await API.graphql(
    graphqlOperation(deleteDocumentItem, { input: payload })
  );
  console.log(data);
  // const { audioFiles } = data.deleteDocumentItem;
  // if (audioFiles) {
  //   // TODO: Check ID
  //   await Promise.all(
  //     audioFiles.map((file) =>
  //       API.graphql(graphqlOperation(deleteAudioFile, { key: file.key }))
  //     )
  //   );
  // }
};

export const triggerDeleteAudioBlock = async (key) => {
  await API.graphql(graphqlOperation(deleteAudioFile, { key }));
};

export const triggerGenAudioBlock = async (block) => {
  console.log(block);
  try {
    const buffer = await API.graphql(
      graphqlOperation(generateAudioFile, block)
    );
    const response = JSON.parse(buffer.data.generateAudioFile);

    const { key } = response.body.audio;

    return key;
  } catch (err) {
    console.log(err);
  }
};

export const triggerGenSubtitleBlock = async (block) => {
  console.log(block);
  try {
    const buffer = await API.graphql(graphqlOperation(generateTimming, block));
    console.log(buffer);
    // Create JS object from JSON
    const { body } = JSON.parse(buffer.data.generateTimming);
    const returnedStream = body.stream;

    // TODO: REMOVE MANIPULATIN LOGIC TO LAMBDA

    const children = returnedStream.map((obj) => {
      const { value, start, end } = obj;
      const text = value.replace(/<(.|\n)*?>/g, "") + " ";
      return {
        start,
        end,
        text,
      };
    });

    console.log(returnedStream);
    console.log(children);

    return children;
  } catch (err) {
    console.log(err);
  }
};

export const saveWsFile = async (input) => {
  try {
    const { data } = await API.graphql(
      graphqlOperation(updateDocumentItem, { input })
    );
    return data.updateDocumentItem;
  } catch (err) {
    console.log(err);
  }
};
