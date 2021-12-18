<template>
  <main class="flex flex-wrap xs:w-full">
    <div class="lg:w-1/4 xs:w-none">
      <article class="w-full lg:w-1/4 p-2 lg:fixed lg:inset-y-1/2">
        <nuxt-link to="/">
          <div class="text-2xl font-bold cursor-pointer">
            kata
          </div>
        </nuxt-link>
        <div class="flex my-4">
          <div
            class="p-3 mx-6 border-white hover:border-yellow-300 transition duration-300 ease-in-out"
          >
            <a href="https://github.com/kawa-t" target="_blank"
              ><font-awesome-icon class="text-2xl" :icon="['fab', 'github']"
            /></a>
          </div>
          <div
            class="p-3 mx-6 border-white hover:border-yellow-300 transition duration-300 ease-in-out"
          ></div>
        </div>
      </article>
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
        class="lg:w-3/4 xs:w-full mt-5 xs:p-2 lg:leading-narmal xs:leading-5 tracking-wide xs:bg-opacity-10 min-h-[80%]"
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
          トップにもどる
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
import HeaderNavigation from "../../components/headerNavigation";
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
