<template>
  <div>
    <span class="badge my-5 mx-2" v-for="(tag, i) in tags" :key="i">
      <nuxt-link :to="linkToTag(tag)">
        {{ tag.fields.name }}
      </nuxt-link>
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
