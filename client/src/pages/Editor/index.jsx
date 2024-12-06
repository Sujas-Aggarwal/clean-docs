import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorHeader from "./header";

const TextEditor = () => {
  // Initialize editorState with EditorState.createEmpty()
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Handle editor state changes
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <EditorHeader/>
      <div className="bg-[#F8F9FA] min-h-screen pb-16">
        <Editor
          toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
          editorClassName="editor-box mt-6 bg-white shadow-lg w-[816px] min-h-[1054px] mx-auto mb-12 border p-10 print:p-0 print:w-full print:min-w-0"
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "embedded",
              "emoji",
              "image",
              "remove",
              "history",
            ],
            inline: {
              options: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "monospace",
                "superscript",
                "subscript",
              ],
            },
            blockType: {
              options: [
                "Normal",
                "H1",
                "H2",
                "H3",
                "H4",
                "Blockquote",
                "Code",
              ],
            },
            fontFamily: {
              options: [
                "Arial",
                "Georgia",
                "Impact",
                "Tahoma",
                "Times New Roman",
                "Verdana",
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
