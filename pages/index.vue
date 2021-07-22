<template>
  <client-only>
    <main class="flex flex-wrap h-screen items-center">
      <article class="w-full lg:w-1/4 p-2">
        <div>
          <div class="flex">
            <div class="text-3xl font-bold">Category</div>
            <button class="mx-4 mt-3" @click="allPosts">すべて表示</button>
          </div>
          <button
            v-for="(category, index) in categories"
            :key="index"
            :category="category"
            @click="filterPostData(category.fields.name, index)"
            class="px-5 py-4"
            :class="{ activeCategory: activeItem === index }"
          >
            {{ category.fields.name }}
          </button>
        </div>
        <div class="mt-4">
          <div class="text-3xl font-bold">Tags</div>
          <TagsList />
        </div>
      </article>
      <article class="w-full lg:w-3/4">
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
      </article>
    </main>
  </client-only>
</template>

<script>
import TitleCard from "../components/TitleCard.vue";
import TagsList from "../pages/tags";
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
    TagsList
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
  @apply border-l-4 border-b-4 border-yellow-200 mx-1;
}
</style>
