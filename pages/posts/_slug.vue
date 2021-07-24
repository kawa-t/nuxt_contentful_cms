<template>
  <main class="flex flex-wrap xs:w-full">
    <div class="lg:w-1/4 xs:w-none">
      <!-- <div> -->
      <!-- <nuxt-link :to="linkToCategory(post)">
          {{ post.fields.category.fields.name }}
        </nuxt-link> -->
      <!-- </div> -->
    </div>
    <div class="lg:w-3/4 xs:w-full">
      <div class="lg:w-3/4 xs:w-full">
        <img
          class="w-full object-cover lg:h-72 xs:h-24"
          :src="setHeaderImg(post).url"
          :alt="setHeaderImg(post).title"
        />
      </div>
      <div class="text-2xl pt-3 xs:pt-6 font-bold">{{ post.fields.title }}</div>
      <div>
        <p>
          <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
        </p>
      </div>
      <div class="lg:w-3/4 xs:w-full mt-5 xs:p-2 leading-loose tracking-wide">
        <div
          style="white-space: pre-wrap;"
          v-html="toHtmlString(post.fields.body)"
        ></div>
      </div>
      <NuxtLink to="/">
        <div
          class="border-t-2 lg:w-3/4 xs:w-full mt-5 py-6 text-right hover:text-yellow-500 transition duration-300 ease-in-out"
        >
          記事一覧にもどる
        </div>
      </NuxtLink>
    </div>
    <HeaderNavigation />
  </main>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import HeaderNavigation from "../../components/headerNavigation.vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default {
  computed: {
    ...mapState(["posts", "categories"]),
    ...mapGetters(["setHeaderImg"])
  },
  async asyncData({ payload, store, params, error }) {
    const post =
      payload ||
      (await store.state.posts.find(post => post.fields.slug === params.slug));
    if (post) {
      return { post };
    } else {
      return error({
        statusCode: "404",
        message: "お探しのページは見つかりませんでした"
      });
    }
  },
  components: {
    HeaderNavigation
  },
  methods: {
    linkToCategory(post) {
      return {
        name: "categories-slug",
        params: { slug: post.fields.category.fields.slug }
      };
    },
    toHtmlString(post) {
      const document = {
        nodeType: "document",
        content: [
          {
            nodeType: "paragraph",
            content: [
              {
                nodeType: "text",
                value: post,
                marks: []
              }
            ]
          }
        ]
      };
      return documentToHtmlString(document);
    }
  }
};
</script>
