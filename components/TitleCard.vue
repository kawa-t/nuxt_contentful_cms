<template>
  <div
    class="p-5 flex-none lg:w-2/5 md:w-2/4 sm:w-1/2 xs:w-full transition duration-300 z-10"
  >
    <nuxt-link :to="linkTo(post)">
      <div
        class="max-w-lg rounded overflow-hidden shadow-lg mb-4"
        @mouseover="CardOn"
        @mouseleave="CardOff"
        :class="{ activeCard: activityCard }"
      >
        <!-- <div class="overflow-hidden w-full h-64">
          <img
            class="w-full h-64 object-cover"
            :src="setHeaderImg(post).url"
            :alt="setHeaderImg(post).title"
          />
        </div> -->
        <div class="px-6 py-4 pb-2 bg-white">
          <div class="font-bold text-xl mb-2">
            {{ $sanitize(post.fields.title) }}
          </div>
          <div>
            <small>{{
              $sanitize($getFormattedDate(post.fields.publishedAt))
            }}</small>
          </div>
          <template v-if="post.fields.tags">
            <div class="py-3">
              <span
                class="badge mr-2"
                v-for="tag in post.fields.tags"
                :key="tag.sys.id"
              >
                <nuxt-link :to="linkToTag(tag)">
                  {{ $sanitize(tag.fields.name) }}
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
  data: function() {
    return {
      activityCard: false
    };
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
    },
    CardOn: function() {
      this.activityCard = true;
    },
    CardOff: function() {
      this.activityCard = false;
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
    @apply bg-yellow-200 font-semibold text-yellow-600;
  }
}
.activeCard {
  @apply transform shadow-xl transition duration-300 ease-in-out;
}
</style>
