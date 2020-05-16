/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const generateAudioFile = /* GraphQL */ `
  query GenerateAudioFile(
    $text: String!
    $voice: String!
    $ssml: Boolean!
    $key: String!
  ) {
    generateAudioFile(text: $text, voice: $voice, ssml: $ssml, key: $key)
  }
`;
export const generateTimming = /* GraphQL */ `
  query GenerateTimming(
    $text: String!
    $voice: String!
    $ssml: Boolean!
    $key: String!
  ) {
    generateTimming(text: $text, voice: $voice, ssml: $ssml, key: $key)
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
      _version
      _deleted
      _lastChangedAt
      owner
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
        voice
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDocumentItems = /* GraphQL */ `
  query SyncDocumentItems(
    $filter: ModelDocumentItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDocumentItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        content {
          id
          type
          url
        }
        voice
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
