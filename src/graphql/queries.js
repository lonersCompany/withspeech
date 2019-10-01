// eslint-disable
// this is an auto generated file. This will be overwritten

export const generateAudio = `query GenerateAudio(
  $text: String!
  $voice: String!
  $paragraf: Int!
) {
  generateAudio(
    text: $text
    voice: $voice
    paragraf: $paragraf
  )
}
`;

export const deleteAudioFile = `query DeleteAudioFile($key: String!) {
  deleteAudioFile(key: $key)
}
`;

export const getDocumentItem = `query GetDocumentItem($id: ID!) {
  getDocumentItem(id: $id) {
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
    audioFiles {
      key
      src
      paragraf
    }
  }
}
`;
export const listDocumentItems = `query ListDocumentItems(
  $filter: ModelDocumentItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listDocumentItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
  }
}
`;
