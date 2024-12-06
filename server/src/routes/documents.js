const express = require("express");
const router = express.Router();
const {
  getDocuments,
  saveDocument,
  getDocument,
  getDocumentVersions,
  saveDocumentVersion,
} = require("../controllers/documentController");

// Get all documents for a user
router.get("/", async (req, res) => {
  try {
    const documents = await getDocuments(req.uid);
    res.json(documents);
  } catch (err) {
    console.error("Error in GET /documents:", err);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
});

// Get a specific document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await getDocument(req.params.id);
    res.json(document);
  } catch (err) {
    console.error("Error in GET /documents/:id:", err);
    res.status(500).json({ error: "Failed to fetch document." });
  }
});

// Save a new document version
router.post("/", async (req, res) => {
  try {
    await saveDocumentVersion(req.body.documentId, req.body.blocks, req.uid);
    res.json({ message: "Document version saved successfully!" });
  } catch (err) {
    console.error("Error in POST /documents:", err);
    res.status(500).json({ error: "Failed to save document version." });
  }
});

// Save a new document or update an existing one
router.put("/", async (req, res) => {
  try {
    const documentId = await saveDocument(
      req.uid,
      req.body.blocks,
      req.body.isNewDocument,
      req.body.documentId,
      req.body.isStarterDocument
    );
    res.json({ documentId });
  } catch (err) {
    console.error("Error in PUT /documents:", err);
    res.status(500).json({ error: "Failed to save document." });
  }
});

// Get all versions of a document
router.get("/:id/versions", async (req, res) => {
  try {
    const versions = await getDocumentVersions(req.params.id);
    res.json(versions);
  } catch (err) {
    console.error("Error in GET /documents/:id/versions:", err);
    res.status(500).json({ error: "Failed to fetch document versions." });
  }
});

module.exports = router;
