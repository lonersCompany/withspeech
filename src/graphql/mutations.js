/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDocumentItem = /* GraphQL */ `
  mutation CreateDocumentItem(
    $input: CreateDocumentItemInput!
    $condition: ModelDocumentItemConditionInput
  ) {
    createDocumentItem(input: $input, condition: $condition) {
      id
      name
      content {
        id
        type
        url
        slideNumber
        children {
          text
          start
          end
        }
      }
    }
  }
`;
export const updateDocumentItem = /* GraphQL */ `
  mutation UpdateDocumentItem(
    $input: UpdateDocumentItemInput!
    $condition: ModelDocumentItemConditionInput
  ) {
    updateDocumentItem(input: $input, condition: $condition) {
      id
      name
      content {
        id
        type
        url
        slideNumber
        children {
          text
          start
          end
        }
      }
    }
  }
`;
export const deleteDocumentItem = /* GraphQL */ `
  mutation DeleteDocumentItem(
    $input: DeleteDocumentItemInput!
    $condition: ModelDocumentItemConditionInput
  ) {
    deleteDocumentItem(input: $input, condition: $condition) {
      id
      name
      content {
        id
        type
        url
        slideNumber
        children {
          text
          start
          end
        }
      }
    }
  }
`;
