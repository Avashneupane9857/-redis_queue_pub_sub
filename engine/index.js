import { createClient } from "redis";
import { indexWorker } from "./works.js";
import { publishClient } from "./pubManager.js";
import { WebSocket, WebSocketServer } from "ws";
export const ws = new WebSocket("ws://localhost:8000");
ws.on("open", () => {
  console.log("im here");
});

ws.on("error", () => {
  console.log("erorr here");
});
ws.on("close", () => {
  console.log(" here");
});
async function main() {
  const client = createClient();
  await client.connect();
  while (1) {
    const response = await client.BRPOP("req", 0);
    const data = JSON.parse(response.element);
    switch (data.reqType) {
      case "push":
        const response = await indexWorker(data.name, data.age);
        await publishClient.publish(data.id, response);
        console.log(response);
        console.log(data.id);
    }
  }
}

main();
