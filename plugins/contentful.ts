import { createClient } from "contentful";

const sdkClient = createClient({
  space: process.env.CTF_SPACE_ID || "",
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN || ""
});

export default sdkClient;
