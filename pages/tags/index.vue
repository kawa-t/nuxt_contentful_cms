<template>
  <div>
    <span
      class="badge my-3 mx-2 cursor-pointer"
      v-for="(tag, i) in tags"
      :key="i"
      @click="filterPostData(tag.fields.name)"
    >
      <!-- <nuxt-link :to="linkToTag(tag)"> -->
      {{ $sanitize(tag.fields.name) }}
      <!-- </nuxt-link> -->
    </span>
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
    },
    filterPostData: function(name) {
      this.filterData = this.posts.map(v => v);
      //   .filter(v => v.fields.tags[0].fields.name === name);

      let fileterTagData = [];
      for (let i = 0; i < this.filterData.length; i++) {
        const post = this.filterData[i];
        for (let i = 0; i < post.fields.tags.length; i++) {
          if (post.fields.tags[i].fields.name === name) {
            fileterTagData.push(post);
          }
        }
      }

      this.$store.commit("filterposts", fileterTagData);
    }
  }
};
</script>

<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-yellow-100 rounded-full px-3 py-1 text-sm font-semibold text-yellow-500;
  &:hover {
    @apply bg-yellow-200;
  }
}
</style>
