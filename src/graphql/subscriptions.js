/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDocumentItem = /* GraphQL */ `
  subscription OnCreateDocumentItem($owner: String!) {
    onCreateDocumentItem(owner: $owner) {
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
export const onUpdateDocumentItem = /* GraphQL */ `
  subscription OnUpdateDocumentItem($owner: String!) {
    onUpdateDocumentItem(owner: $owner) {
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
export const onDeleteDocumentItem = /* GraphQL */ `
  subscription OnDeleteDocumentItem($owner: String!) {
    onDeleteDocumentItem(owner: $owner) {
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
