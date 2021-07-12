<template>
  <div>
    <h4>
      {{ post.fields.title }}
    </h4>
    <div class="has-text-right">
      <p>
        <!-- <small>{{ getFormattedDate(post.fields.publishedAt) }}</small> -->
      </p>
    </div>
    <hr />
    <div>
      {{ post.fields.body }}
    </div>
  </div>
</template>
<script>
import sdkClient from "~/plugins/contentful";

export default {
  computed: {
    post() {
      return this.posts.find(
        post => post.fields.slug === this.$route.params.slug
      );
    }
  },
  async asyncData({ env }) {
    let posts = [];
    await sdkClient
      .getEntries({
        content_type: "blogPost",
        order: "-fields.publishedAt"
      })
      .then(res => {
        posts = res.items;
      })
      .catch(console.error);
    return { posts };
  },
  methods: {
    getFormattedDate(date) {
      const originDate = new Date(date);
      const year = originDate.getFullYear();
      const month = originDate.getMonth() + 1;
      const day = originDate.getDate();
      return `${year}年${month}月${day}日`;
    }
  }
};
</script>
