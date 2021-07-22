<template>
  <main class="flex flex-wrap h-screen items-center">
    <article class="w-full lg:w-1/4 p-2">
      <div class="text-3xl font-bold">Tag:{{ tag.fields.name }}</div>
      <div>
        <TagsList />
      </div>
    </article>
    <article class="w-full lg:w-3/4">
      <div class="flex overflow-x-auto align-items">
        <div
          v-for="(post, i) in relatedTagPosts"
          :key="i"
          class="max-w-lg rounded overflow-hidden shadow-lg m-6"
        >
          <nuxt-link :to="linkToPost(post)">
            <img
              class="w-full h-64 object-cover"
              :src="setHeaderImg(post).url"
              :alt="setHeaderImg(post).title"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">
                {{ post.fields.title }}
              </div>
              <div>
                <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </article>
  </main>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import TagsList from "../tags/";

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
    }
  }
};
</script>
