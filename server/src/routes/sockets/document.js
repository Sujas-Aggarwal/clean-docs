const express = require("express");
const router = express.Router();

let activeClients = 0; // Counter to track active WebSocket connections

router.ws("/:id", (ws, req) => {
  if (activeClients > 4) {
    ws.close(1000, "Server too busy");
    return;
  }
  else{
    activeClients++;
  }
  console.log("Client connected");
  console.log(`Now we have ${activeClients} active connections`);

  ws.setMaxListeners(4);

  // Handle incoming messages
  ws.on("message", (msg) => {
    console.log("Message from client:", msg);
  });

  // Handle errors
  ws.on("error", (error) => {
    console.log("WebSocket error:", error);
  });

  // Handle disconnections
  ws.on("close", () => {
    activeClients--; // Decrement on disconnection
    console.log("Client disconnected");
    console.log(`Now we have ${activeClients} active connections`);
  });

  // Send an initial message to the client
  ws.send(`Hello! Message from server! You requested for ${req.params.id}`);
});

module.exports = router;
