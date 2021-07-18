<template>
  <div>
    <h2>タグ一覧ページ</h2>
    <div v-for="(tag, i) in tags" :key="i">
      <nuxt-link :to="linkToTag(tag)">
        {{ tag.fields.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["posts", "tags"])
  },
  methods: {
    linkToTag(tag) {
      return { name: "tags-slug", params: { slug: tag.fields.slug } };
    }
  }
};
</script>
