<template>
  <div>
    <nuxt-link :to="linkTo(post)">
      <article>
        <figure>
          <div>タイトル：：{{ post.fields.title }}</div>
          <p>{{ post.fields.category.fields.name }}</p>
          <div>
            <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
          </div>
        </figure>
      </article>
    </nuxt-link>
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
            headerImage: null
          }
        };
      }
    }
  },
  methods: {
    linkTo(post) {
      return { name: "posts-slug", params: { slug: post.fields.slug } };
    }
  }
};
</script>
