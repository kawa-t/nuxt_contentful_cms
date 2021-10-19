<template>
  <main class="flex flex-wrap xs:w-full">
    <div class="lg:w-1/4 xs:w-none">
      <!-- <div> -->
      <!-- <nuxt-link :to="linkToCategory(post)">
          {{ $sanitize(post.fields.category.fields.name) }}
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
      <div class="text-2xl pt-3 xs:pt-6 font-bold">
        {{ $sanitize(post.fields.title) }}
      </div>
      <div>
        <p>
          <small>{{
            $sanitize($getFormattedDate(post.fields.publishedAt))
          }}</small>
        </p>
      </div>
      <div
        class="lg:w-3/4 xs:w-full mt-5 xs:p-2 lg:leading-narmal xs:leading-5 tracking-wide xs:bg-opacity-10"
      >
        <div
          class="markdown tracking-wide"
          style="white-space: pre-wrap;"
          v-html="$md.render(post.fields.body)"
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
    <div class="lg:block xs:hidden">
      <HeaderNavigation />
    </div>
  </main>
</template>
<script lnag="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import HeaderNavigation from "../../components/headerNavigation.vue";
import Prism from "~/plugins/prism.ts";

export default Vue.extend({
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
    }
  },
  mounted() {
    Prism.highlightAll();
  }
});
</script>
