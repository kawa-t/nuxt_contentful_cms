<template>
  <div>
    <h2>カテゴリー：{{ category.fields.name }}の記事一覧</h2>
    <div v-for="(post, i) in relatedPosts" :key="i">
      <nuxt-link :to="linkTo(post)">
        {{ post.fields.category.fields.name }}
        {{ post.fields.title }}
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category);
    }
  },
  async asyncData({ payload, store, params, error }) {
    const category =
      payload ||
      (await store.state.categories.find(
        cat => cat.fields.slug === params.slug
      ));

    if (category) {
      return { category };
    } else {
      return error({ statusCode: 400 });
    }
  },
  methods: {
    linkTo(post) {
      return { name: "posts-slug", params: { slug: post.fields.slug } };
    }
  }
};
</script>
