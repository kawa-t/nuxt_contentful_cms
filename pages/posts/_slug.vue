<template>
  <div>
    <h3>{{ post.fields.title }}</h3>
  </div>
</template>
<script>
import sdkClient from "../../plugins/contentful";

export default {
  computed: {
    post() {
      return this.posts.find(
        post => post.fields.slug === this.$route.params.slug
      );
    }
  },
  mounted: async function() {
    try {
      const response = await sdkClient.getEntries({
        content_type: "blogPost",
        order: "-fields.publishedAt"
      });
      // console.log(response.items);
      this.posts = response.items;
    } catch (error) {
      // とりあえず何もしない
    }
  }
};
</script>
