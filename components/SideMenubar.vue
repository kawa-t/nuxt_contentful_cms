<template>
  <div>
    <div class="mb-18">
      <div class="text-2xl font-bold cursor-pointer" @click="allPosts">
        kata
      </div>
      <div class="flex my-4">
        <div
          class="p-3 mx-6 border-white hover:border-yellow-300 transition duration-300 ease-in-out"
        >
          <a
            href="https://github.com/kawa-t"
            target="_blank"
            aria-label="{description}"
            ><font-awesome-icon class="text-2xl" :icon="['fab', 'github']"
          /></a>
        </div>
        <div
          class="p-3 mx-6 border-white hover:border-yellow-300 transition duration-300 ease-in-out"
        ></div>
      </div>
    </div>
    <div>
      <div class="flex">
        <div class="text-3xl font-bold">Category</div>
        <button
          class="mx-4 my-1 border-b-2 border-white hover:border-yellow-300 transition duration-300 ease-in-out pt-2"
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
        class="px-5 pt-4 pb-3 border-b-3 hover:border-yellow-200"
        :class="{ activeCategory: activeItem === index }"
      >
        {{ $sanitize(category.fields.name) }}
      </button>
    </div>
    <div class="mt-4 mb-2">
      <div class="text-3xl font-bold">Tags</div>
      <TagsList />
    </div>
  </div>
</template>

<script>
import TagsList from "../pages/tags";
import SideMenu from "../components/SideMenubar";
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      filterData: [],
      activeItem: null
    };
  },
  components: {
    TagsList,
    SideMenu
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
  @apply border-b-4 border-yellow-200 text-yellow-500 xs:text-yellow-400 xs:border-yellow-300;
}
</style>
