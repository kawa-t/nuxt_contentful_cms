<template>
  <main class="flex flex-wrap h-screen items-center">
    <article class="w-full lg:w-1/4 p-2">
      <nuxt-link to="/">
        <div class="text-2xl font-bold cursor-pointer">
          kata
        </div>
      </nuxt-link>
      <div class="flex my-4">
        <div
          class="p-3 mx-6 border-white hover:border-yellow-300 transition duration-300 ease-in-out"
        >
          <a href="https://github.com/kawa-t" target="_blank"
            ><font-awesome-icon class="text-2xl" :icon="['fab', 'github']"
          /></a>
        </div>
        <div
          class="p-3 mx-6 border-white hover:border-yellow-300 transition duration-300 ease-in-out"
        ></div>
      </div>
      <div class="text-2xl font-bold">Tag:{{ tag.fields.name }}の一覧</div>
      <div>
        <!-- <TagsList /> // タグ詳細ページには一旦表示させないようにする -->
      </div>
    </article>
    <article class="w-full lg:w-3/4 overflow-hidden">
      <div class="flex flex-wrap align-items justify-center">
        <div
          v-for="(post, i) in relatedTagPosts"
          :key="i"
          class="p-5 flex-none lg:w-2/5 md:w-2/4 sm:w-1/2 xs:w-full transition duration-300 z-10"
        >
          <nuxt-link :to="linkToPost(post)">
            <div class="max-w-lg rounded overflow-hidden shadow-lg mb-4">
              <img
                class="w-full h-64 object-cover"
                :src="setHeaderImg(post).url"
                :alt="setHeaderImg(post).title"
              />
            </div>
            <div class="px-6 py-4 pb-2 bg-white">
              <div class="font-bold text-xl mb-2">
                {{ $sanitize(post.fields.title) }}
              </div>
              <div>
                <small>{{
                  $sanitize($getFormattedDate(post.fields.publishedAt))
                }}</small>
              </div>
            </div>
          </nuxt-link>
          <template v-if="post.fields.tags">
            <div class="px-5 pb-3">
              <span
                class="badge mr-4"
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
    </article>
  </main>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import TagsList from "~/pages/tags";

export default {
  asyncData({ payload, params, error, store }) {
    const tag =
      payload || store.state.tags.find(tag => tag.fields.slug === params.slug);

    if (tag) {
      const relatedTagPosts = store.getters.associatePosts(tag);

      return { tag, relatedTagPosts };
    } else {
      error({ statusCode: 400 });
    }
  },
  components: {
    TagsList
  },
  computed: {
    ...mapState(["filterposts"]),
    ...mapGetters(["setHeaderImg"])
  },
  methods: {
    linkToPost(post) {
      return {
        name: "posts-slug",
        params: { slug: post.fields.slug }
      };
    },
    linkToTag(tag) {
      return {
        name: "tags-slug",
        params: { slug: tag.fields.slug }
      };
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
