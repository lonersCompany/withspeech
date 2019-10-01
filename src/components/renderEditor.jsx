import React from "react";

function renderEditor(props, editor, next) {
  const { editor } = props;
  const wordCount = countWords(editor.value.text);
  const children = next();
  return (
    <React.Fragment>
      {children}
      <span className="word-count">{wordCount}</span>
    </React.Fragment>
  );
}

export default renderEditor;
