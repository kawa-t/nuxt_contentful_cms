<template>
  <main class="flex flex-wrap">
    <div class="w-full lg:w-1/4">
      <!-- <div> -->
      <!-- <nuxt-link :to="linkToCategory(post)">
          {{ post.fields.category.fields.name }}
        </nuxt-link> -->
      <!-- </div> -->
    </div>
    <div class="w-3/4 lg:w-3/4">
      <div class="w-3/4">
        <img
          class="w-full object-cover h-72"
          :src="setHeaderImg(post).url"
          :alt="setHeaderImg(post).title"
        />
      </div>
      <div class="text-2xl pt-3 font-bold">{{ post.fields.title }}</div>
      <div>
        <p>
          <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
        </p>
      </div>
      <div class="w-2/3 mt-5">
        {{ post.fields.body }}
      </div>
      <NuxtLink to="/">
        <div
          class="border-t-2 w-3/4 mt-5 py-6 text-right hover:text-yellow-500 transition duration-300 ease-in-out"
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
    }
  }
};
</script>
