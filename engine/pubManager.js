import { createClient } from "redis";
export const publishClient = createClient();
await publishClient.connect();
