const { v4: uuidv4 } = require("uuid");
const templates = require("../data/templates/starter");

// Fetch all documents for a specific user
async function getDocuments(uid) {
  try {
    const documents = await global.db.query(
      "SELECT * FROM documents WHERE owner_uid = ?",
      [uid]
    );
    //sort documents based on updated_at
    documents.sort((a, b) => {
      if (a.created_at < b.created_at) return 1;
      if (a.created_at > b.created_at) return -1;
      return 0;
    });
    return documents;
  } catch (err) {
    console.error("Error getting documents:", err);
    throw err;
  }
}
// Save a new document or update an existing one
async function saveDocument(
  uid,
  name = "Untitled",
  blocks = [],
  isNewDocument = false,
  documentId = null,
  templateName = null
) {
  if (documentId === null && !isNewDocument) {
    throw new Error("Document ID is required for existing documents!");
  }
  try {
    if (isNewDocument && blocks.length === 0) {
      if (templateName !== null) {
        console.log("Request to create template" , templateName)
        console.log(templates[templateName]);
        name = templateName + "_template";
        blocks = templates[templateName];
      }
      const newDocId = uuidv4();
      await global.db.query(
        "INSERT INTO documents (id, owner_uid, current_version, name) VALUES (?, ?, ?, ?)",
        [newDocId, uid, JSON.stringify(blocks), name]
      );
      await global.db.query(
        "INSERT INTO document_versions (document_id, version_number, content) VALUES (?, ?, ?)",
        [newDocId, 1, JSON.stringify(blocks)]
      );
      console.log("Document created successfully:", newDocId);
      return newDocId;
    } else {
      console.log("Request to update");
      if (name === "Untitled") {
        await global.db.query(
          "UPDATE documents SET current_version = ? WHERE id = ?",
          [JSON.stringify(blocks), documentId]
        );
        console.log("Document updated successfully:", documentId);
        return documentId;
      } else {
        await global.db.query("UPDATE documents SET  name = ? WHERE id = ?", [
          name,
          documentId,
        ]);
        console.log("Document name changed successfully", documentId);
        return documentId;
      }
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
  const db = global.db; // Use global db instance

  try {
    // Delete associated document versions
    const versionsResult = await db.query(
      "DELETE FROM document_versions WHERE document_id = ?",
      [documentId]
    );
    console.log(
      `Document versions deleted successfully for document ID ${documentId}:`,
      versionsResult.affectedRows
    );

    // Delete the main document
    const documentResult = await db.query(
      "DELETE FROM documents WHERE id = ?",
      [documentId]
    );
    console.log(
      `Document deleted successfully for document ID ${documentId}:`,
      documentResult.affectedRows
    );

    // Commit the transaction
    await db.query("COMMIT");
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
