<template>
  <div>
    <h4>
      {{ post.fields.title }}
    </h4>
    <div class="has-text-right">
      <p>
        <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
      </p>
    </div>
    <hr />
    <div>
      {{ post.fields.body }}
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["posts"]),
    post() {
      return this.posts.find(
        post => post.fields.slug === this.$route.params.slug
      );
    }
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
  }
};
</script>
