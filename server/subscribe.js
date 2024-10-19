import { createClient } from "redis";
export async function listener() {
  const publisherClient = createClient();
  await publisherClient.connect();
  await publisherClient.subscribe(uuid)
}
