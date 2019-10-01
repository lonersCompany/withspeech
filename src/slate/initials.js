import { Value } from "slate";
export const placeHolderValue = {
  document: {
    object: "document",
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "Document name",
            marks: [
              {
                object: "mark",
                type: "headline"
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "Start to write or copy article"
          }
        ]
      }
    ]
  }
};

export const loadingValue = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "..."
          }
        ]
      }
    ]
  }
};

export const EmojiPlaceholder = Value.fromJSON({
  object: "value",
  document: {
    object: "document",
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text:
              "In addition to block nodes, you can create inline void nodes, like "
          },
          {
            object: "inline",
            type: "emoji",
            data: { code: "😃" }
          },
          {
            object: "text",
            text: "!"
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "inline",
            type: "emoji",
            data: { code: "🍔" }
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "This example shows emojis in action."
          }
        ]
      }
    ]
  }
});
