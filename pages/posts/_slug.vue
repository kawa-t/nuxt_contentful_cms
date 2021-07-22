<template>
  <main class="flex flex-wrap">
    <div class="w-full lg:w-1/4">
      <!-- <div> -->
      <!-- <nuxt-link :to="linkToCategory(post)">
          {{ post.fields.category.fields.name }}
        </nuxt-link> -->
      <!-- </div> -->
    </div>
    <div class="w-full lg:w-3/4">
      <div class="w-full">
        <img
          class="w-2/3 h-1/5"
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
    </div>
  </main>
</template>
<script>
import { mapState, mapGetters } from "vuex";

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
