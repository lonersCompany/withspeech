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

// function generateUUID() {
//   // Public Domain/MIT
//   var d = new Date().getTime(); //Timestamp
//   var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//     var r = Math.random() * 16; //random number between 0 and 16
//     if (d > 0) {
//       //Use timestamp until depleted
//       r = (d + r) % 16 | 0;
//       d = Math.floor(d / 16);
//     } else {
//       //Use microseconds since page-load if supported
//       r = (d2 + r) % 16 | 0;
//       d2 = Math.floor(d2 / 16);
//     }
//     return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
//   });
// }

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

  // try {
  //   const { data } = await API.graphql(
  //     graphqlOperation({
  //       query: `query listDocumentItems {
  //         listDocumentItems {
  //           items {
  //             id
  //             name
  //           }
  //         }
  //       }`,
  //       variables: {},
  //       authMode: "AWS_IAM",
  //     })
  //   );
  //   console.log(data);
  //   const { items } = data.listDocumentItems;

  //   return items;
  // } catch (err) {
  //   console.log(err);
  //   //history.push("/login");
  // }
};

export const uploadWsFile = async (input) => {
  try {
    const { data } = await API.graphql(
      graphqlOperation(updateDocumentItem, { input })
    );
    const response = data.updateDocumentItem;
    return response;
  } catch (err) {
    alert("File didn't save :( Try to copy your text and refresh browser");
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
  try {
    const buffer = await API.graphql(
      graphqlOperation(generateAudioFile, block)
    );
    const response = JSON.parse(buffer.data.generateAudioFile);

    return response.body.audio.key;
  } catch (err) {
    console.log(err);
  }
};

export const triggerGenSubtitleBlock = async (block) => {
  try {
    const buffer = await API.graphql(graphqlOperation(generateTimming, block));
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

    console.log(children);

    // const renameValueToText = returnedStream.map((obj) =>
    //   renameObjFiled(obj, "value", "text")
    // );

    // const addSpaceToEnd = renameValueToText.map((obj) => ({
    //   ...obj,
    //   text: obj.text.replace(/<(.|\n)*?>/g, "") + " ",
    // }));

    //const children = addSpaceToEnd;

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
