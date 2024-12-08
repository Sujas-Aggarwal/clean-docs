import React, { useEffect, useState, useRef, useCallback } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorHeader from "./header";
import axios from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TextEditor = () => {
  let shouldSave = false;
  const { id } = useParams();
  const socketRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editorStateRef = useRef(editorState);
  const [docName, setDocName] = useState("Untitled");

  // Establish WebSocket connection
  const connectWebSocket = useCallback(() => {
    // Close existing connection if it exists
    if (socketRef.current) {
      socketRef.current.close();
    }

    // Create new WebSocket connection
    const newSocket = new WebSocket(
      `ws://localhost:8000/socket/document/${id}`
    );

    newSocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket Disconnected", event);
      // Attempt to reconnect after a delay
      setTimeout(connectWebSocket, 3000);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socketRef.current = newSocket;
  }, [id]);

  // Update ref whenever editorState changes
  useEffect(() => {
    editorStateRef.current = editorState;
  }, [editorState]);

  // Connect WebSocket on component mount or id change
  useEffect(() => {
    if (id) {
      connectWebSocket();
    }

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [id, connectWebSocket]);

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
      let currentState = editorStateRef.current;
      const rawContent = convertToRaw(currentState.getCurrentContent());
      const currentBlocks = rawContent.blocks;

      const response = await axios.put(
        "/documents",
        {
          blocks: currentBlocks.length > 0 ? currentBlocks : [],
          isNewDocument: false,
          documentId: id,
          isStarterDocument: false,
        },
        { withCredentials: true }
      );

      console.log("Document Saved Successfully:", response.data);
      toast.success("Document saved");
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Failed to save document");
    } finally {
      setIsSaving(false);
    }
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);

    if (!shouldSave) {
      shouldSave = true;
    }
    // Ensure WebSocket is open before sending
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        const rawContent = convertToRaw(newEditorState.getCurrentContent());
        const currentBlocks = rawContent.blocks;
        socketRef.current.send(JSON.stringify(currentBlocks));
      } catch (error) {
        console.error("Error sending WebSocket message:", error);
      }
    }
  };
  if (socketRef.current === null) {
    return <div>Loading...</div>;
  }
  socketRef.current.onmessage = (event) => {
    try {
      const blocks = JSON.parse(event.data);
      const contentState = convertFromRaw({
        entityMap: {},
        blocks: blocks,
      });
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
      editorStateRef.current = newEditorState;
    } catch (error) {
      console.error("Error receiving WebSocket message:", error);
    }
  };

  async function setDocumentName(name) {
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
      setDocName(name);
    } catch (error) {
      console.error("Error saving document name:", error);
      toast.error("Failed to save document name");
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EditorHeader
        isSaving={isSaving}
        saveFunction={saveDocument}
        documentName={docName}
        setDocumentName={setDocumentName}
      />
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
