const express = require("express");
const { saveDocument, saveFunctionWS } = require("../../controllers/documentController");
const router = express.Router();

let activeClients = [];
router.ws("/:id", (ws, req) => {
  if (activeClients.length >= 4) {
    ws.close(1000, "Server too busy");
    return;
  } else {
    activeClients.push(ws);
  }
  console.log("Client connected");
  console.log(`Now we have ${activeClients.length} active connections`);

  // Handle incoming messages
  ws.on("message", (msg) => {
    saveFunctionWS(uid = req.params.id,blocks = msg);
    console.log("Message from client:", msg);
    activeClients.forEach((client) => {
      if (client != ws) {
        client.send(`${msg}`);
      }
    });
  });

  // Handle errors
  ws.on("error", (error) => {
    console.log("WebSocket error:", error);
  });

  // Handle disconnections
  ws.on("close", () => {
    activeClients = activeClients.filter((client) => client != ws); // Decrement on disconnection
    console.log("Client disconnected");
    console.log(`Now we have ${activeClients.length} active connections`);
  });
});

module.exports = router;
