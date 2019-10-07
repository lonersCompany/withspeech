import React, { useState } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

let autoSaveSetTimeOut;

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src }
  });
}

function MarkHotkey(options) {
  // Grab our options from the ones passed in.
  const { type, key, funType } = options;

  return {
    onKeyDown(event, editor, next) {
      // If it doesn't match our `key`, let other plugins handle it.
      if (!event.ctrlKey || event.key !== key) return next();

      // Prevent the default characters from being inserted.
      event.preventDefault();

      // Toggle the mark `type`.

      switch (funType) {
        case "toggleMark":
          return editor.toggleMark(type);
        case "toggleBlock":
          return editor.command(
            insertImage,
            "https://placekitten.com/g/200/300"
          );
        default:
          return;
      }
    }
  };
}

// Call Marktogler MarkHotkey()
const plugins = [
  MarkHotkey({ key: "b", type: "bold", funType: "toggleMark" }),
  MarkHotkey({ key: "`", type: "code", funType: "toggleMark" }),
  MarkHotkey({ key: "i", type: "italic", funType: "toggleMark" }),
  MarkHotkey({ key: "~", type: "strikethrough", funType: "toggleMark" }),
  MarkHotkey({ key: "u", type: "underline", funType: "toggleMark" }),
  MarkHotkey({ key: "h", type: "headline", funType: "toggleMark" }),
  MarkHotkey({ key: "m", type: "media", funType: "toggleBlock" })
];

// Check Marks and render
const handleRenderMark = (props, editor, next) => {
  switch (props.mark.type) {
    case "headline":
      return <h1>{props.children}</h1>;
    case "bold":
      return <strong>{props.children}</strong>;
    case "code":
      return <code>{props.children}</code>;
    case "italic":
      return <em>{props.children}</em>;
    case "strikethrough":
      return <del>{props.children}</del>;
    case "underline":
      return <u>{props.children}</u>;
    default:
      return next();
  }
};

const renderBlock = (props, editor, next) => {
  const { attributes, node } = props;

  switch (node.type) {
    case "image": {
      const src = node.data.get("src");
      return <img {...attributes} src={src} alt={"alt"} />;
    }

    default: {
      return next();
    }
  }
};

function WsEditor({ document, handleEdtiorChange }) {
  const [currentValue, setCurrentValue] = useState(
    Value.fromJSON({ document })
  );

  const handleChangeDocument = ({ value }) => {
    if (value.document !== currentValue.document) {
      clearTimeout(autoSaveSetTimeOut);
      autoSaveSetTimeOut = setTimeout(function() {
        const { document } = value.toJSON();
        handleEdtiorChange(document);
      }, 500);
    }
    setCurrentValue(value);
  };

  return (
    <Editor
      placeholder="Enter a title..."
      value={currentValue}
      plugins={plugins}
      onChange={handleChangeDocument}
      renderMark={handleRenderMark}
      renderBlock={renderBlock}
      id={"editor"}
    />
  );
}

export default WsEditor;
