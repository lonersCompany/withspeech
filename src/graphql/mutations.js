// eslint-disable
// this is an auto generated file. This will be overwritten

export const createDocumentItem = `mutation CreateDocumentItem($input: CreateDocumentItemInput!) {
  createDocumentItem(input: $input) {
    id
    name
    document {
      nodes {
        object
        type
        data {
          src
        }
        nodes {
          object
          type
          text
          marks {
            object
            type
          }
        }
      }
    }
  }
}
`;
export const updateDocumentItem = `mutation UpdateDocumentItem($input: UpdateDocumentItemInput!) {
  updateDocumentItem(input: $input) {
    id
    name
    document {
      nodes {
        object
        type
        data {
          src
        }
        nodes {
          object
          type
          text
          marks {
            object
            type
          }
        }
      }
    }
  }
}
`;
export const updateDocumentAudioLinks = `mutation UpdateDocumentItem($input: UpdateDocumentItemInput!) {
  updateDocumentItem(input: $input) {
    id
    audioFiles {
      key
      src
      paragraf
    }
  }
}
`;
export const deleteDocumentItem = `mutation DeleteDocumentItem($input: DeleteDocumentItemInput!) {
  deleteDocumentItem(input: $input) {
    id
    audioFiles {
      key
      src
      paragraf
    }
  }
}
`;
