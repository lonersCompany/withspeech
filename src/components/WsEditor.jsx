// Import React dependencies.
import React, { useMemo, useEffect } from "react";

// Import Image dependencies
import imageExtensions from "image-extensions";
import isUrl from "is-url";

// Import the Slate editor factory.
import { Transforms, createEditor } from "slate";

// Import the Slate components and React plugin.
import {
  Slate,
  Editable,
  useEditor,
  useSelected,
  useFocused,
  withReact
} from "slate-react";

import { withHistory } from "slate-history";

const InsertImageButton = () => {
  const editor = useEditor();
  return (
    <button
      className="px-5 py-3"
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (!url) return;
        insertImage(editor, url);
      }}
    >
      (img)
    </button>
  );
};

const isImageUrl = url => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          className={`
          block w-full ${selected && focused ? "h" : "none"};
          `}
        />
      </div>
      {children}
    </div>
  );
};

const insertImage = (editor, url) => {
  const text = { text: "Image Caption" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Element = props => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "image":
      return <ImageElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const withImages = editor => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const WsEditor = ({ textValue, handleEditiorChange }) => {
  // const textSave = textValue.map(obj => {
  //   const newObj = Object.assign({}, obj);
  //   newObj.children =
  //     newObj.children.length != 0 ? newObj.children : [{ text: "-" }];
  //   return newObj;
  // });

  // console.log(textSave);

  const value = textValue;

  // useEffect(() => {
  //   console.log(textValue);
  // }, [textValue]);

  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

  const handleTextChange = value => {
    console.log(value[0].children);
    handleEditiorChange(value);
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => handleTextChange(value)}
      className={"shadow"}
    >
      <div className="fixed bottom-0 bg-black mb-10">
        <InsertImageButton />
      </div>
      <Editable
        renderElement={props => <Element {...props} />}
        placeholder="Enter some text..."
      />
    </Slate>
  );
};

export default WsEditor;
