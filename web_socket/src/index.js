import express from "express";
import { WebSocket, WebSocketServer } from "ws";
const app = express();
const httpServer = app.listen(8000);
const wsss = new WebSocketServer({ server: httpServer });

wsss.on("connection", (ws) => {
  console.log("inside coonnection");

  ws.on("open", () => {
    console.log(`web socket connectiojn is opened`);
  });

  ws.on("message", (data, isBinary) => {
    if (ws.readyState == WebSocket.OPEN) {
      wsss.clients.forEach((client) => {
        client.send(data, { binary: isBinary });
      });
    }
  });
  ws.on("close", () => {
    console.log("connection closed");
  });
});
