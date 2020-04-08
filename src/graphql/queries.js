/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const generateAudio = /* GraphQL */ `
  query GenerateAudio(
    $text: String!
    $voice: String!
    $ssml: Boolean!
    $key: String!
  ) {
    generateAudio(text: $text, voice: $voice, ssml: $ssml, key: $key)
  }
`;
export const generateSubtitles = /* GraphQL */ `
  query GenerateSubtitles(
    $text: String!
    $voice: String!
    $ssml: Boolean!
    $key: String!
  ) {
    generateSubtitles(text: $text, voice: $voice, ssml: $ssml, key: $key)
  }
`;
export const deleteAudioFile = /* GraphQL */ `
  query DeleteAudioFile($key: String!) {
    deleteAudioFile(key: $key)
  }
`;
export const getDocumentItem = /* GraphQL */ `
  query GetDocumentItem($id: ID!) {
    getDocumentItem(id: $id) {
      id
      name
      content {
        id
        type
        url
        children {
          text
          start
          end
        }
      }
      voice
    }
  }
`;
export const listDocumentItems = /* GraphQL */ `
  query ListDocumentItems(
    $filter: ModelDocumentItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        content {
          id
          type
          url
        }
        voice
      }
      nextToken
    }
  }
`;
