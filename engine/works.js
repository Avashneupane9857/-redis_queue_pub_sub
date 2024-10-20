import { helper } from "./helper.js";
import { ws } from "./index.js";

export async function indexWorker(name, age) {
  console.log("sending the data");

  ws.send(JSON.stringify(helper));
  console.log("sent the data");

  return `I received name and age ${name} and ${age}`;
}
