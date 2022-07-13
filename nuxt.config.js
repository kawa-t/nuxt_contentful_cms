const sdkClient = require("./plugins/contentful").default;

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  ssr: "true",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "kata.dev",
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "x-ua-compatible", content: "ie=edge" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "日々の振り返りとか"
      },
      {
        name: "format-detection",
        content: "telephone=no, email=no, address=no"
      },
      { property: "og:title", content: "kata" },
      { property: "og:site_name", content: "kata" },
      { property: "og:locale", content: "ja_JP" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "kata note" },
      {
        property: "og:url",
        content: "https://shikatana.netlify.app/"
      },
      {
        property: "og:image",
        content: "https://shikatana.netlify.app/images/og_profile_202201.png"
      },
      {
        property: "og:image:width",
        content: "1200"
      },
      {
        property: "og:image:height",
        content: "630"
      },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href:
          "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>📒</text></svg>"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/utils.ts", "@/plugins/prism", "@/plugins/sanitizehtml"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/tailwindcss",
    "nuxt-webfontloader",
    "@nuxt/typescript-build"
  ],

  tailwindcss: {
    viewer: false
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/markdownit", "nuxt-fontawesome"],
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードに変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
  },
  fontawesome: {
    imports: [
      {
        set: "@fortawesome/free-brands-svg-icons",
        icons: ["fab"]
      }
    ]
  },
  webfontloader: {
    google: {
      families: ["Lato:400,700", "Noto+Sans+JP:400,700"]
    }
  },

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
          })
        ];
      });
    }
  }
};
