import React, { useEffect, useState, useCallback, useRef } from "react";
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
  const [isSaving, setIsSaving] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editorStateRef = useRef(editorState);
  const [docName, setDocName] = useState("Untitled");
  // Update ref whenever editorState changes
  useEffect(() => {
    editorStateRef.current = editorState;
  }, [editorState]);

  // Document fetching effect
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/documents/${id}`, {
          withCredentials: true,
        });
        const currentVersion = response.data.current_version || [];
        setDocName(response.data.name);
        // Convert fetched blocks to EditorState
        const contentState = convertFromRaw({
          entityMap: {},
          blocks:
            currentVersion.length > 0
              ? currentVersion
              : [
                  {
                    text: "",
                    type: "unstyled",
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
        });
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
        editorStateRef.current = newEditorState;

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

  // Keyboard shortcut and save effect
  useEffect(() => {
    const saveDocOnKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        // Use the ref to get the most current editor state
        e.preventDefault();
        saveDocument();
      }
    };

    document.addEventListener("keydown", saveDocOnKeyPress);
    return () => document.removeEventListener("keydown", saveDocOnKeyPress);
  }, []);

  const saveDocument = async () => {
    setIsSaving(true);
    try {
      // Derive blocks from the current editorState
      let currentState = editorStateRef.current;
      const rawContent = convertToRaw(currentState.getCurrentContent());
      const currentBlocks = rawContent.blocks;

      // Ensure we don't send empty blocks if there were previous blocks
      const blocksToSave =
        currentBlocks.length > 0
          ? currentBlocks
          : [
              {
                text: "",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ];

      const response = await axios.put(
        "/documents",
        {
          blocks: blocksToSave,
          isNewDocument: false,
          documentId: id,
          isStarterDocument: false,
        },
        { withCredentials: true }
      );

      console.log("Document Saved Successfully:", response.data);
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Failed to save document");
    }
    finally{
      setIsSaving(false);
    }

  };
  const saveTimeoutRef = useRef(null);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);

    // Reset the timer if it's already running
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Start a new timeout
    saveTimeoutRef.current = setTimeout(() => {
      saveDocument(newEditorState);
      saveTimeoutRef.current = null; // Clear the timeout after saving
    }, 500);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  async function setDocumentName(name){
    try {
      await axios.put(
        "/documents",
        {
          name: name,
          isNewDocument: false,
          documentId: id,
          isStarterDocument: false,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Failed to save document");
    }
  }

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        className={"print:hidden"}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <EditorHeader isSaving={isSaving} saveFunction={saveDocument} documentName={docName} setDocumentName={setDocumentName}/>
      <div className="bg-[#F8F9FA] min-h-screen pb-16 print:p-0 print:m-0 editor-dabba">
        <div className="h-[120px] print:hidden"></div>
        <Editor
          toolbarClassName="flex fixed top-[80px] left-0 w-full z-[1000] mx-auto print:hidden"
          editorClassName="editor-box print:shadow-none print:border-none mt-6 bg-white shadow-lg w-[816px] min-h-[1054px] mx-auto mb-12 border p-10 print:p-0 print:w-full print:min-w-0 print:m-0"
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
