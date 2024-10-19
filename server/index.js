import express from "express";
import { createClient } from "redis";
import { listener } from "./subscribe.js";
import { v4 } from "uuid";

const app = express();
app.use(express.json());
const client = createClient();
client.connect();
app.post("/push", async (req, res) => {
  const { name, age } = req.body;
  console.log(name, age);
  const id = v4();
  console.log(id);
  await client.LPUSH("req", JSON.stringify({ id, name, age, reqType: "push" }));
  res.send("post req is in queue");
  listener(id, res);
});
app.listen(3000, () => {
  console.log("Running server");
});
