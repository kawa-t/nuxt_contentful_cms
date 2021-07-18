const sdkClient = require("./plugins/contentful").default;

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-contentfu-cms",
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/utils.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // contentful setting
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_PREVIEW_ACCESS_TOKEN: process.env.CTF_PREVIEW_ACCESS_TOKEN
  },

  router: {
    middleware: ["getPosts"]
  },

  generate: {
    routes() {
      return Promise.all([
        sdkClient.getEntries({
          content_type: "blogPost"
        }),
        sdkClient.getEntries({
          content_type: "category"
        }),
        sdkClient.getEntries({
          content_type: "tag"
        })
      ]).then(([posts, categories]) => {
        return [
          ...posts.items.map(post => {
            return { route: `posts/${post.fields.slug}`, payload: post };
          }),
          ...categories.items.map(category => {
            return {
              route: `categories/${category.fields.slug}`,
              payload: category
            };
          }),
          ...tags.items.map(tag => {
            return {
              route: `tags/${tag.fields.slug}`,
              payload: tag
            };
          })
        ];
      });
    }
  }
};
