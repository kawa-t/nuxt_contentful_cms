<template>
  <div>
    <article>
      <figure>
        <div>タイトル：：{{ post.fields.title }}</div>
        <div>
          <small>{{ getFormattedDate(post.fields.publishedAt) }}</small>
        </div>
        <nuxt-link :to="linkTo(post)">記事みる</nuxt-link>
      </figure>
    </article>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      reqire: true,
      default: () => {
        return {
          fields: {
            title: "sample",
            publishhehAt: new Date(),
            headerImage: null,
            slug: 1
          }
        };
      }
    }
  },
  computed: {
    linkTo(post) {
      return { name: "posts-slug", params: { slug: post.fields.slug } };
    }
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
