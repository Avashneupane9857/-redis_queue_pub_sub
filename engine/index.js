import { createClient } from "redis";
import { indexWorker } from "./works.js";
async function main() {
  const client = createClient();
  await client.connect();
  const response = await client.BRPOP("req", 0);
  const data = JSON.parse(response.element);
  switch (data.reqType) {
    case "push":
      const res = indexWorker(data.name, data.age);
      //publish here with id and response
      console.log(res);
  }
}

main();
