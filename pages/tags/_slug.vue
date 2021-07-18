<template>
  <div>
    <h1>タグ：{{ tag.fields.name }}の記事一覧</h1>
    <div v-for="(post, i) in relatedTagPosts" :key="i">
      <nuxt-link :to="linkToPost(post)">
        {{ post.fields.title }}
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  asyncData({ payload, params, error, store }) {
    const tag =
      payload || store.state.tags.find(tag => tag.fields.slug === params.slug);
    // let tag = payload;
    // if (!tag) {
    //   for (let i = 0; i < store.state.posts.length; i++) {
    //     const tags = store.state.posts[i].fields.tags;
    //     if (tags) tag = tags.find(tag => tag.fields.slug === params.slug);
    //     if (tag) break;
    //   }
    // }
    if (tag) {
      const relatedTagPosts = store.getters.associatePosts(tag);

      // const relatedTagPosts = await sdkClient
      //   .getEntries({
      //     content_type: "blogPost",
      //     "fields.tags.sys.id": tag.sys.id
      //   })
      //   .then(res => res.items)
      //   .catch(console.error);

      return { tag, relatedTagPosts };
    } else {
      error({ statusCode: 400 });
    }
  },
  methods: {
    linkToPost(post) {
      return {
        name: "posts-slug",
        params: { slug: post.fields.slug }
      };
    }
  }
};
</script>
