import React, { useEffect, useState, useCallback } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorHeader from "./header";
import axios from "../../lib/axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TextEditor = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [blocks, setBlocks] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Keyboard shortcut and auto-save effect
  useEffect(() => {
    const saveDocOnKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveDocument();
      }
    };

    document.addEventListener("keydown", saveDocOnKeyPress);
    return () => document.removeEventListener("keydown", saveDocOnKeyPress);
  }, []);


  // Document fetching effect
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/documents/${id}`, {
          withCredentials: true,
        });

        const currentVersion = response.data.current_version || [];
        setBlocks(currentVersion);

        // Convert fetched blocks to EditorState
        const contentState = convertFromRaw({
          entityMap: {},
          blocks: currentVersion,
        });
        setEditorState(EditorState.createWithContent(contentState));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching document:", error);
        toast.error("Failed to load document");
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDocument();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const saveDocument = async () => {
    try {
      const response = await axios.put(
        "/documents",
        {
          blocks,
          isNewDocument: false,
          documentId: id,
        },
        { withCredentials: true }
      );
      toast.success("Document saved successfully!");
      console.log("Document Saved Successfully:", response.data);
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Failed to save document");
    }
  };

  const onEditorStateChange = (newEditorState) => {
    const rawContent = convertToRaw(newEditorState.getCurrentContent());
    setBlocks(rawContent.blocks);
    setEditorState(newEditorState);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <EditorHeader />
      <button
        onClick={saveDocument}
        className="fixed top-0 right-0 z-[1001] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
      <div className="bg-[#F8F9FA] min-h-screen pb-16 editor-dabba">
        <div className="h-[120px]"></div>
        <Editor
          toolbarClassName="flex fixed top-[80px] left-0 w-full z-[1000] mx-auto"
          editorClassName="editor-box mt-6 bg-white shadow-lg w-[816px] min-h-[1054px] mx-auto mb-12 border p-10 print:p-0 print:w-full print:min-w-0"
          editorState={editorState}
          placeholder="Start writing here..."
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
              options: ["Normal", "H1", "H2", "H3", "H4", "Blockquote", "Code"],
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