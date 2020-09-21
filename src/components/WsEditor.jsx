// Import React dependencies.
import React, { useMemo } from "react";

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
  withReact,
} from "slate-react";

import { withHistory } from "slate-history";

const InsertImageButton = () => {
  const editor = useEditor();
  return (
    <button
      className="block mb-5 px-5 py-3 rounded bg-blue-900 hover:bg-green-500 shadow"
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (!url) return;
        insertImage(editor, url);
      }}
    >
      + Image
    </button>
  );
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div
      className="pb-10 w-full h-full flex justify-center bg-gray-900"
      {...attributes}
    >
      <div className="max-h-screen" contentEditable={false}>
        <img
          src={element.url}
          alt="How to figured out alts?"
          className={`
          max-h-screen ${selected && focused ? "h" : "none"};
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

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "image":
      return <ImageElement {...props} />;
    default:
      return (
        <p className="pb-10" {...attributes}>
          {children}
        </p>
      );
  }
};

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
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
  //     newObj.children.length !== 0 ? newObj.children : [{ text: "-" }];
  //   return newObj;
  // });

  // console.log(textSave);

  const value = textValue;

  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

  const handleTextChange = (value) => {
    handleEditiorChange(value);
  };

  return (
    <div className="px-5 pt-8 pb-64">
      <div>
        <div
          className="flex items-center bg-green-400 text-sm font-bold px-4 py-3 mb-10"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <div>Now you can edit text</div>
        </div>
      </div>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => handleTextChange(value)}
        className={"shadow"}
      >
        <div className="fixed bottom-0">
          <InsertImageButton />
        </div>
        <Editable
          renderElement={(props) => <Element {...props} />}
          placeholder="Enter some text..."
        />
      </Slate>
    </div>
  );
};

export default WsEditor;
