import { createClient } from "redis";
import { indexWorker } from "./works.js";
import { publishClient } from "./pubManager.js";
async function main() {
  const client = createClient();
  await client.connect();

  const response = await client.BRPOP("req", 0);
  const data = JSON.parse(response.element);
  switch (data.reqType) {
    case "push":
      const response = indexWorker(data.name, data.age);
      publishClient.publish(data.id, response);
      console.log(response);
      console.log(data.id);
  }
}

main();
