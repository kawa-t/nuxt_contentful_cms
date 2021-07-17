<template>
  <div>
    <h3>{{ post.fields.title }}</h3>
    <div class="has-text-right">
      <p>
        <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
      </p>
    </div>
    <hr />
    <nuxt-link :to="linkToCategory(post)">
      {{ post.fields.category.fields.slug }}
    </nuxt-link>

    <div>カテゴリ：{{ post.fields.category.fields.name }}</div>
    <div>
      {{ post.fields.body }}
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["posts", "categories"])
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
