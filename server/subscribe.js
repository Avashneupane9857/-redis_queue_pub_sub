import { createClient } from "redis";
const subClient = createClient();
await subClient.connect();
export async function listener(uuid, res) {
  try {
    await subClient.subscribe(uuid, (message) => {
      console.log(`${message}`);
      res.send(message);
    });
    console.log(`Subscribed to channel: ${uuid}`);
  } catch (error) {
    console.error("Error in listener:", error);
    res.status(500).send("Error during subscription");
  }
}
