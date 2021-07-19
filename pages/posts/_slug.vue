<template>
  <div>
    <h3>{{ post.fields.title }}</h3>
    <div class="has-text-right">
      <p>
        <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
      </p>
    </div>
    <div>
      <!-- <div>{{ post.fields.headerImage.fields.file.url }}</div> -->
      <img :src="setHeaderImg(post).url" :alt="setHeaderImg(post).title" />
    </div>
    <hr />
    <nuxt-link :to="linkToCategory(post)">
      カテゴリ：{{ post.fields.category.fields.name }}
    </nuxt-link>
    <div>
      {{ post.fields.body }}
    </div>
  </div>
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
