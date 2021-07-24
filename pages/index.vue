<template>
  <client-only>
    <main class="flex flex-wrap h-screen items-center xs:min-w-full">
      <article class="w-full lg:w-1/4 p-2">
        <div class="mb-18">
          <div class="text-2xl font-bold">kata</div>
          <div class="flex mb-4">
            <div
              class="p-3 mx-6 border-white hover:border-yellow-300 transition duration-300 ease-in-out"
            >
              <a href="https://github.com/kawa-t" target="_blank">github</a>
            </div>
            <div
              class="p-3 mx-6 border-white hover:border-yellow-300 transition duration-300 ease-in-out"
            >
              <a href="https://twitter.com/denknit" target="_blank">Twitter</a>
            </div>
          </div>
        </div>
        <div>
          <div class="flex">
            <div class="text-3xl font-bold">Category</div>
            <button
              class="mx-4 my-2 border-b-2 border-white hover:border-yellow-300 transition duration-300 ease-in-out pt-2"
              @click="allPosts"
            >
              すべて表示
            </button>
          </div>
          <button
            v-for="(category, index) in categories"
            :key="index"
            :category="category"
            @click="filterPostData(category.fields.name, index)"
            class="px-5 py-4 border-l-4 border-b-4 hover:border-yellow-200"
            :class="{ activeCategory: activeItem === index }"
          >
            {{ category.fields.name }}
          </button>
        </div>
        <div class="mt-4 ">
          <div class="text-3xl font-bold">Tags</div>
          <TagsList />
        </div>
      </article>
      <article class="w-full lg:w-3/4 overflow-hidden">
        <BackgoundAnimetion />
        <div
          class="flex overflow-x-auto align-items"
          v-if="filterposts.length !== 0"
        >
          <TitleCard
            v-for="(post, index) in filterposts"
            :key="index"
            :post="post"
          />
        </div>
        <div class="flex overflow-x-auto" v-else>
          <TitleCard v-for="(post, index) in posts" :key="index" :post="post" />
        </div>
        <div>
          <HeaderNavigation />
        </div>
      </article>
    </main>
  </client-only>
</template>

<script>
import TitleCard from "../components/TitleCard.vue";
import TagsList from "../pages/tags";
import HeaderNavigation from "../components/headerNavigation.vue";
import BackgoundAnimetion from "../components/BackgoundAnimetion";
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      filterData: [],
      activeItem: null
    };
  },
  components: {
    TitleCard,
    TagsList,
    HeaderNavigation,
    BackgoundAnimetion
  },
  computed: {
    ...mapState(["posts", "filterposts", "categories"])
  },
  methods: {
    filterPostData: function(name, index) {
      this.filterData = this.posts
        .map(v => v)
        .filter(v => v.fields.category.fields.name === name);

      this.$store.commit("filterposts", this.filterData);

      // 色をつける
      if (this.activeItem !== index) {
        this.activeItem = index;
      }
    },
    allPosts: function() {
      // カテゴリーアクティブ色をリセット
      this.activeItem = null;
      // Vuexに伝える
      this.$store.commit("filterposts", this.posts);
    }
  }
};
</script>

<style lang="postcss" scoped>
.activeCategory {
  @apply border-l-4 border-b-4 border-yellow-200 text-yellow-500 xs:text-yellow-500 xs:border-yellow-500;
}
</style>
