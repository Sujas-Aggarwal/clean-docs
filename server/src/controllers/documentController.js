const { v4: uuidv4 } = require("uuid");

// Fetch all documents for a specific user
async function getDocuments(uid) {
  try {
    const documents = await global.db.query(
      "SELECT * FROM documents WHERE owner_uid = ?",
      [uid]
    );
    return documents;
  } catch (err) {
    console.error("Error getting documents:", err);
    throw err;
  }
}

// Save a new document or update an existing one
async function saveDocument(
  uid,
  blocks = [],
  isNewDocument = true,
  documentId = null,
  isStarterDocument = false
) {
  try {
    if (isNewDocument) {
      if (isStarterDocument) {
        blocks = [
          {
            key: "5v7hq",
            text: "Clean Docs",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "ljsl",
            text: "It's amazing because it provides so many features - ",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "f2k5p",
            text: "live collaboration",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "9ricm",
            text: "multiple pages",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "9kclg",
            text: "responsive",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "faqsh",
            text: "optimised",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "9bftr",
            text: "rich text",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "dao93",
            text: "markdown support",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "attdp",
            text: "back support with ms word and google docs",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "82pnt",
            text: "authentication",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "cak77",
            text: "styled using tailwind",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "24vi8",
            text: "made using react, nodejs and mariadb",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "9ro5g",
            text: "live websockets using socket io ",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "eqhtm",
            text: "",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: "cs7ub",
            text: "[PS: The above text was copy pasted from my notion]",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ];
      }
      const newDocId = uuidv4();
      await global.db.query(
        "INSERT INTO documents (id, owner_uid, current_version) VALUES (?, ?, ?)",
        [newDocId, uid, JSON.stringify(blocks)]
      );
      await global.db.query(
        "INSERT INTO document_versions (document_id, version_number, content) VALUES (?, ?, ?)",
        [newDocId, 1, JSON.stringify(blocks)]
      );
      console.log("Document created successfully:", newDocId);
      return newDocId;
    } else {
      await global.db.query(
        "UPDATE documents SET current_version = ? WHERE id = ?",
        [JSON.stringify(blocks), documentId]
      );
      console.log("Document updated successfully:", documentId);
      return documentId;
    }
  } catch (err) {
    console.error("Error saving document:", err);
    throw err;
  }
}

// Fetch a specific document by ID
async function getDocument(documentId) {
  try {
    console.log(documentId);
    const [document] = await global.db.query(
      "SELECT * FROM documents WHERE id = ?",
      [documentId]
    );
    if (!document) throw new Error("Document not found!");
    return document;
  } catch (err) {
    console.error("Error getting document:", err);
    throw err;
  }
}

// Fetch all versions of a document
async function getDocumentVersions(documentId) {
  try {
    const versions = await global.db.query(
      "SELECT * FROM document_versions WHERE document_id = ?",
      [documentId]
    );
    if (!versions.length) throw new Error("No versions found!");
    return versions;
  } catch (err) {
    console.error("Error getting document versions:", err);
    throw err;
  }
}

// Save a new version of a document
async function saveDocumentVersion(documentId, blocks) {
  try {
    const { count } = (
      await global.db.query(
        "SELECT COUNT(*) AS count FROM document_versions WHERE document_id = ?",
        [documentId]
      )
    )[0];
    const versionNumber = count + 1;
    await global.db.query(
      "INSERT INTO document_versions (document_id, version_number, content) VALUES (?, ?, ?)",
      [documentId, versionNumber, JSON.stringify(blocks)]
    );
    console.log("Document version saved successfully:", versionNumber);
  } catch (err) {
    console.error("Error saving document version:", err);
    throw err;
  }
}

// Delete a document and its versions
async function deleteDocument(documentId) {
  try {
    await global.db.query("DELETE FROM documents WHERE id = ?", [documentId]);
    console.log("Document deleted successfully:", documentId);
    await global.db.query(
      "DELETE FROM document_versions WHERE document_id = ?",
      [documentId]
    );
    console.log("Document versions deleted successfully:", documentId);
  } catch (err) {
    console.error("Error deleting document:", err);
    throw err;
  }
}

module.exports = {
  getDocuments,
  saveDocument,
  getDocument,
  getDocumentVersions,
  saveDocumentVersion,
  deleteDocument,
};
