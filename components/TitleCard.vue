<template>
  <div>
    <article>
      <figure>
        <div>タイトル：：{{ post.fields.title }}</div>
        <div>
          <small>{{ getFormattedDate(post.fields.publishedAt) }}</small>
        </div>
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
            headerImage: null
          }
        };
      }
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
