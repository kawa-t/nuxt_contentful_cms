const contentful = require("contentful");

const defaultConfig = {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
};

const sdkClient = contentful.createClient(defaultConfig);

export default sdkClient;
