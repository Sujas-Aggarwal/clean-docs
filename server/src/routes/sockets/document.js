const express = require("express");
const {
  saveDocument,
  saveFunctionWS,
} = require("../../controllers/documentController");
const router = express.Router();

let activeClients = [];
router.ws("/:id", (ws, req) => {
  if (activeClients.length >= 10) {
    ws.close(1000, "Server too busy");
    return;
  } else {
    activeClients.push({ socket: ws, id: req.params.id });
  }
  console.log("Client connected");
  console.log(`Now we have ${activeClients.length} active connections`);

  // Handle incoming messages
  ws.on("message", (msg) => {
    saveFunctionWS((uid = req.params.id), (blocks = msg));
    console.log("Message from client:", msg);
    activeClients.filter((client)=>client.id==req.params.id).forEach((client) => {
      if (client.socket != ws) {
        client.socket.send(`${msg}`);
      }
    });
  });

  // Handle errors
  ws.on("error", (error) => {
    console.log("WebSocket error:", error);
  });

  // Handle disconnections
  ws.on("close", () => {
    activeClients = activeClients.filter((client) => client.socket != ws); // Decrement on disconnection
    console.log("Client disconnected");
    console.log(`Now we have ${activeClients.length} active connections`);
  });
});

module.exports = router;
