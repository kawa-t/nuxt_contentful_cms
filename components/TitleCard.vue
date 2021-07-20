<template>
  <div class="p-5">
    <nuxt-link :to="linkTo(post)">
      <div class="max-w-lg rounded overflow-hidden shadow-lg mb-4">
        <img
          class="w-full"
          :src="setHeaderImg(post).url"
          :alt="setHeaderImg(post).title"
        />
        <div class="px-6 py-4 pb-2">
          <div class="font-bold text-xl mb-2">
            {{ post.fields.title }}
          </div>
          <div>
            <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
          </div>
          <template v-if="post.fields.tags">
            <div class="py-3">
              <span
                class="badge mr-2"
                v-for="tag in post.fields.tags"
                :key="tag.sys.id"
              >
                <nuxt-link :to="linkToTag(tag)">
                  {{ tag.fields.name }}
                </nuxt-link>
              </span>
            </div>
          </template>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

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
  computed: {
    ...mapState(["filterposts"]),
    ...mapGetters(["setHeaderImg"])
  },
  methods: {
    linkTo(post) {
      return { name: "posts-slug", params: { slug: post.fields.slug } };
    },
    linkToTag(tag) {
      return {
        name: "tags-slug",
        params: { slug: tag.fields.slug }
      };
    }
  },
  mounted: function() {
    this.$store.commit("filterposts", []);
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
